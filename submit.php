
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quizzme"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];


// Prepare and bind
$stmt = $conn->prepare("INSERT INTO user_names(email, username, password) VALUES (?, ?, ?)"); // Replace 'users' with your table name
$stmt->bind_param("sss", $email, $username, $password );

// Execute the statement
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement and connections
$stmt->close();
$conn->close();
?>
