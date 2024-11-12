<?php
header("Access-Control-Allow-Origin: *"); // Mengizinkan semua domain
header("Access-Control-Allow-Methods: GET, POST"); // Mengizinkan metode ini
header("Access-Control-Allow-Headers: Content-Type"); // Mengizinkan header ini

$servername = "localhost";  
$username = "grey2186_park";         
$password = "Nathaniel2004.";
$dbname = "grey2186_esp32_data";    

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Cek apakah parameter id_slot_parkir diterima
if (isset($_GET['id_slot_parkir'])) {
    $id_slot_parkir = $_GET['id_slot_parkir'];

    // Ambil nilai terbaru dari tabel data_park berdasarkan id_slot_parkir
    $sql = "SELECT value FROM data_park WHERE slot_parkir = '$id_slot_parkir'";
    $result = $conn->query($sql);

    $row = $result->fetch_assoc();
    echo $row['value'];
    
} else {
    echo "id_slot_parkir parameter not provided";  // Pesan jika parameter tidak disediakan
}

$conn->close();
?>
