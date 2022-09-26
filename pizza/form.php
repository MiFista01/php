<?php

$status = 0;
if($_POST["name"] != "" && 
$_POST["adress"] != "" && 
$_POST["phone"] != "" && 
$_POST["adress"] != "" && 
$_POST["email"] != "" && 
$_POST["kind"] != "" && 
$_POST["count"] != ""){
    $status = 1;
}else{
    $status = 0;
}

echo $status;
?>