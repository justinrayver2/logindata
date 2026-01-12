<?php
$servername = "localhost";
$username = "root";
$password = ""; // Default XAMPP password is empty
$dbname = "just"; // Change this if your database name is different

$conn = mysqli_connect("localhost","root","","pao");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
