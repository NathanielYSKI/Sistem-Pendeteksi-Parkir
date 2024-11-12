<?php
$servername = "localhost";  
$username = "grey2186_park";         
$password = "Nathaniel2004.";
$dbname = "grey2186_esp32_data";    

// Buat koneksi ke MySQL
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Cek apakah data POST diterima
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $device_id = $_POST['device_id'];      
    $sensor_value = $_POST['sensor_value']; 

    // Insert atau Update data sensor ultrasonik
    $sql_check = "SELECT * FROM data_ultrasonic WHERE device_id='$device_id'";
    $result = $conn->query($sql_check);

    if ($result->num_rows > 0) {
        // Update jika data sudah ada
        $sql_update = "UPDATE data_ultrasonic SET sensor_value='$sensor_value', timestamp=NOW() WHERE device_id='$device_id'";
        $conn->query($sql_update);
    } else {
        // Insert jika data belum ada
        $sql_insert = "INSERT INTO data_ultrasonic (device_id, sensor_value) VALUES ('$device_id', '$sensor_value')";
        $conn->query($sql_insert);
    }

    // Cari nomor parkiran dan id_photoresistor berdasarkan id_ultrasonic
    $sql_parkir = "SELECT slot_parkir, id_photoresistor FROM data_park WHERE id_ultrasonic = '$device_id'";
    $result_parkir = $conn->query($sql_parkir);

    if ($result_parkir->num_rows > 0) {
        $row = $result_parkir->fetch_assoc();
        $slot_parkir = $row['slot_parkir'];
        $device_id_photoresistor = $row['id_photoresistor'];

        // Ambil nilai sensor terbaru dari photoresistor
        $sql_photoresistor = "SELECT sensor_value FROM data_photoresistor WHERE device_id = '$device_id_photoresistor' ORDER BY timestamp DESC LIMIT 1";
        $result_photoresistor = $conn->query($sql_photoresistor);
        $sensor_value_photoresistor = ($result_photoresistor->num_rows > 0) ? $result_photoresistor->fetch_assoc()['sensor_value'] : 0;

        // Ambil nilai terbaru dari sensor ultrasonik yang baru saja diperbarui
        $sensor_value_ultrasonic = $sensor_value;

        // Tentukan status parkiran
        $parkir_status = ($sensor_value_photoresistor == 1 && $sensor_value_ultrasonic == 1) ? 1 : 0;

        // Update status parkiran di tabel data_park
        $sql_update_parkir = "UPDATE data_park SET value = $parkir_status WHERE slot_parkir = '$slot_parkir'";
        if ($conn->query($sql_update_parkir) === TRUE) {
            echo "Status parkiran updated successfully: " . $parkir_status;
        } else {
            echo "Error updating park status: " . $conn->error;
        }
    } else {
        echo "Parkiran dengan id_ultrasonic tersebut tidak ditemukan.";
    }
} else {
    echo "No POST data received";
}

// Tutup koneksi
$conn->close();
?>
