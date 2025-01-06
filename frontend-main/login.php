<?php
header('Content-Type: application/json');
require_once "config.php";

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $email = mysqli_real_escape_string($conn, $data['email']);
    $password = $data['password'];
    
    // Validate input
    if(empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Please fill all fields"]);
        exit;
    }
    
    // Check if user exists
    $sql = "SELECT id, name, email, password FROM users WHERE email = ?";
    if($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "s", $email);
        
        if(mysqli_stmt_execute($stmt)) {
            mysqli_stmt_store_result($stmt);
            
            if(mysqli_stmt_num_rows($stmt) == 1) {
                mysqli_stmt_bind_result($stmt, $id, $name, $email, $hashed_password);
                if(mysqli_stmt_fetch($stmt)) {
                    if(password_verify($password, $hashed_password)) {
                        // Password is correct
                        echo json_encode([
                            "success" => true,
                            "message" => "Login successful",
                            "user" => [
                                "id" => $id,
                                "name" => $name,
                                "email" => $email
                            ]
                        ]);
                    } else {
                        echo json_encode(["success" => false, "message" => "Invalid password"]);
                    }
                }
            } else {
                echo json_encode(["success" => false, "message" => "No account found with this email"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Something went wrong. Please try again"]);
        }
        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conn);
?>
