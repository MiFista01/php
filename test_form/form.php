<?php
    echo json_encode(array("name"=>isset($_POST["name"]),
                            "email"=>isset($_POST["email"]),
                            "text"=>isset($_POST["text"])));
?>