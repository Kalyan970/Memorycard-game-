<?php
header('Content-Type: application/json');
require_once "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $phone = mysqli_real_escape_string($conn, $data['phone']);
    $password = $data['password'];
    
    // Validate input
    if(empty($name) || empty($email) || empty($phone) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Please fill all fields"]);
        exit;
    }
    
    // Check if email already exists
    $sql = "SELECT id FROM users WHERE email = ?";
    if($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $email);
        if(mysqli_stmt_execute($stmt)) {
            mysqli_stmt_store_result($stmt);
            if(mysqli_stmt_num_rows($stmt) > 0) {
                echo json_encode(["success" => false, "message" => "This email is already registered"]);
                mysqli_stmt_close($stmt);
                exit;
            }
        }
        mysqli_stmt_close($stmt);
    }
    
    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $sql = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";
    if($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $phone, $hashed_password);
        
        if(mysqli_stmt_execute($stmt)) {
            echo json_encode([
                "success" => true,
                "message" => "Registration successful",
                "user" => [
                    "id" => mysqli_insert_id($conn),
                    "name" => $name,
                    "email" => $email
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Something went wrong. Please try again"]);
        }
        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conn);
?>
