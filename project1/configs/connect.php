<?php
require_once("database_module.php");
require_once("../model/Model.php");
$conn = new database_module("localhost","MiFista","Al2ek0s01","mifista");
$conn->connect();
if ($_POST["status"] == 1){
    if($conn->getOne(Models::check_user($_POST["dates"])) != 'false'){
        $result = $conn->getOne(Models::check_user($_POST["dates"]));
        session_start();
        $_SESSION['name'] = $result['name'];
        echo $_SESSION['name'];
    }
    
}
elseif($_POST["status"] == 2 ){
    echo json_encode($conn->getAll(Models::get_dates($_POST["query"])));
}
elseif($_POST["status"] == 3 ){
    echo json_encode($conn->upd(Models::creat($_POST["dates"])));
    echo Models::creat($_POST["dates"]);
}
elseif($_POST["status"] == 4 ){
    echo json_encode($conn->upd(Models::update_country($_POST["dates"])));
    // echo json_encode($_POST["dates"]);
}
elseif($_POST["status"] == 5 ){
    echo json_encode($conn->upd(Models::delete($_POST["form"])));
}
elseif($_POST["status"] == 6 ){
    echo json_encode($conn->upd(Models::update_city($_POST["dates"])));
    // echo Models::update_city($_POST["dates"]);
}
elseif($_POST["status"] == 7 ){
    echo json_encode($conn->getAll(Models::all_deleted_country($_POST["query"])));
}
elseif($_POST["status"] == 9 ){
    echo json_encode($conn->getAll(Models::all_deleted_city($_POST["query"])));
}
elseif($_POST["status"] == 8 ){
    echo json_encode($conn->upd(Models::creat_city($_POST["dates"])));
}
elseif($_POST["status"] == 10 ){
    echo json_encode($conn->upd(Models::reestablish($_POST["form"])));
}
?>