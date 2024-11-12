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

// Query untuk mendapatkan data mall
$sql = "SELECT * FROM data_mall";
$result = $conn->query($sql);

$malls = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $malls[] = $row;
    }
}

// Mengembalikan data dalam bentuk JSON
echo json_encode($malls);

$conn->close();
?>