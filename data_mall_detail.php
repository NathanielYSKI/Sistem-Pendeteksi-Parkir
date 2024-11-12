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

if (isset($_GET['mall_id'])) {
    $mall_id = (int)$_GET['mall_id']; // Memastikan mall_id adalah integer
    error_log("Mall ID dari request: " . $mall_id);

    $sql = "SELECT * FROM data_park WHERE mall_id = ?"; 
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("i", $mall_id); // Gunakan "i" untuk integer
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $parkirData = [];
            
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $parkirData[] = $row;
                }
                echo json_encode($parkirData);
            } else {
                echo json_encode(["message" => "Tidak ada data ditemukan untuk mall ini."]);
            }
        } else {
            echo json_encode(["error" => "Error executing statement: " . $stmt->error]);
        }
    } else {
        echo json_encode(["error" => "Error preparing statement: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "No mall_id provided."]);
}

$conn->close();
?>
