<?php
$servername = "localhost";  
$username = "grey2186_park";         
$password = "Nathaniel2004.";
$dbname = "grey2186_esp32_data";    

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Ganti mall_id dengan id
if (isset($_GET['id'])) {
    $id = (int)$_GET['id']; // Memastikan id adalah integer
    error_log("ID dari request: " . $id);

    $sql = "SELECT * FROM data_mall WHERE id = ?"; 
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("i", $id); // Gunakan "i" untuk integer
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $parkirData = [];
            
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $parkirData[] = $row;
                }
                echo json_encode($parkirData);
            } else {
                echo json_encode(["message" => "Tidak ada data ditemukan untuk ID ini."]);
            }
        } else {
            echo json_encode(["error" => "Error executing statement: " . $stmt->error]);
        }
    } else {
        echo json_encode(["error" => "Error preparing statement: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "No ID provided."]);
}

$conn->close();
?>
