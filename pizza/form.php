<?php
session_start();
$_SESSION["order"] = $_POST;
if (isset($_POST["name"]) && isset($_POST["adress"]) && isset($_POST["phone"]) && isset($_POST["email"]) && filter_var($_POST["email"],FILTER_VALIDATE_EMAIL)){
    echo json_encode(array(1,$_POST));
}else{
    echo json_encode(array(0));
}

?>