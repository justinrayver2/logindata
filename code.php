<?php
include 'db.php';

// Set header to return JSON
header('Content-Type: application/json');

// Get the input data (JSON)
$input = json_decode(file_get_contents('php://input'), true);

$action = $input['action'];

// 1. READ (Fetch Data)
if ($action == 'read') {
    $sql = "SELECT * FROM users ORDER BY id DESC";
    $result = $conn->query($sql);
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

// 2. CREATE (Add Data)
if ($action == 'create') {
    $name = $input['name'];
    $email = $input['email'];

    $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $email);
    
    if($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}

// 3. UPDATE (Edit Data)
if ($action == 'update') {
    $id = $input['id'];
    $name = $input['name'];
    $email = $input['email'];

    $stmt = $conn->prepare("UPDATE users SET name=?, email=? WHERE id=?");
    $stmt->bind_param("ssi", $name, $email, $id);
    
    if($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}

// 4. DELETE (Remove Data)
if ($action == 'delete') {
    $id = $input['id'];

    $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
    $stmt->bind_param("i", $id);
    
    if($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error']);
    }
}
?>
