<?php
header('Content-Type: application/json');
require_once 'config.php';

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['userId']) || !isset($data['level']) || !isset($data['score']) || !isset($data['timeTaken'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required data']);
    exit;
}

$userId = $data['userId'];
$level = $data['level'];
$score = $data['score'];
$timeTaken = $data['timeTaken'];

try {
    $stmt = $conn->prepare("INSERT INTO game_records (user_id, level, score, time_taken) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isis", $userId, $level, $score, $timeTaken);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Score saved successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save score']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
