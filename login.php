<?php

$conn = mysqli_connect("localhost","root","","pao");
if(!$conn){
    die("Error!");
}
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * from login where username = '$username' and password = '$password'";

$result = mysqli_query($conn,$sql);

if(mysqli_num_rows($result) > 0){
    header("Location: landing.html");
    exit();
} else {
    echo("Error!!!");
}

mysqli_close($conn);

?>