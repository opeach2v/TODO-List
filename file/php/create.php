<?php
$conn = mysqli_connect(
    'localhost',
    'root',
    'oohboksoong2',
    'todoDB');

$sql = "SELECT * FROM todo_user";
$result = mysqli_query($conn, $sql);
?>