<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Mengizinkan semua domain
header("Access-Control-Allow-Methods: GET, POST"); // Mengizinkan metode ini
header("Access-Control-Allow-Headers: Content-Type"); // Mengizinkan header ini

$host = "localhost";  
$user = "grey2186_park";         
$pass = "Nathaniel2004."; 
$dbname = "grey2186_esp32_data"; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (isset($input['id'])) {
    $id = $input['id'];
    $value = -1;

    $stmt = $pdo->prepare("UPDATE data_park SET value = :value WHERE id = :id");
    $stmt->execute(['value' => $value, 'id' => $id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Data updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No rows updated']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
}
?>
