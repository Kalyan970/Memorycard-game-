<?php
header('Content-Type: application/json');
require_once 'config.php';

$level = isset($_GET['level']) ? $_GET['level'] : 'easy';
$validLevels = ['easy', 'normal', 'expert'];

if (!in_array($level, $validLevels)) {
    echo json_encode(['error' => 'Invalid level']);
    exit;
}

try {
    $query = "SELECT g.score, g.time_taken, g.completed_at, u.name 
              FROM game_records g 
              JOIN users u ON g.user_id = u.id 
              WHERE g.level = ? 
              ORDER BY g.score DESC, g.time_taken ASC 
              LIMIT 10";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $level);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $leaderboard = [];
    while ($row = $result->fetch_assoc()) {
        $leaderboard[] = [
            'name' => $row['name'],
            'score' => $row['score'],
            'time_taken' => $row['time_taken'],
            'completed_at' => date('M d, Y', strtotime($row['completed_at']))
        ];
    }
    
    echo json_encode(['success' => true, 'data' => $leaderboard]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
