<?php
$servername = "localhost";
$username = "MiFista";
$password = "Al2ek0s01";
$db_name = "mifista";

// Create connection
$conn = new mysqli($servername, $username, $password, $db_name);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$conn->close();
    if(empty($_POST['username']) || empty($_POST['age'])){
        echo 'ada';
    }else{
        $sql_query = "SELECT * FROM proffesions";
        $result = $conn->query("SELECT * FROM proffesions");
        foreach ($variable as $key => $value) {
            echo $key;
        }
}
?>