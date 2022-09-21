<?php
include_once"arrays.php";
$html_sample = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>`;
foreach ($school as $key1 => $value1) { //получение группы и его значения
    $html_sample .= "<div style = 'clear: both;'><h1>".$key1."</h1>";
    $html_sample .= "<p><span style='font-weight: bold;font-size: 23px;'> Class teacher: </span>".$value1["class_room_teacher"]."</p>";
    foreach ($value1["students"] as $key2 => $valu2) {
        echo $valu2["name"];
        $html_sample .= "<div style='float: left;'>";
        $html_sample.= "<h3>".$valu2["name"]."</h3>";
        $html_sample .= "<img src='img/".$valu2["photo"]."'>";
        $html_sample .= "</div>";
    }
    $html_sample .= "</div>";
}
$html_sample .= `</body>
</html>`;
echo $html_sample;
?>
