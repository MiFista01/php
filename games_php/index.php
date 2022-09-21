<?php
include_once "massiv.php";

$html_sample = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>`;


foreach ($games as $key => $value) {
    $html_sample .= "<div id = 'game'><h1>".$games[$key]["name"]."</h1>";
    $html_sample .= "<h2>Жанры: ";
    foreach ($games[$key]["genres"] as $ke2 => $value2) {
        $html_sample.= "<span style = 'font-size:18px; font-weight: normal;'>".$value2."</span>/ ";
    }
    $html_sample .= "</h2>";
    $html_sample .= "<h2>Описание: <span style = 'font-size:18px; font-weight: normal;'>".$games[$key]["description"]."</span></h2>";
    $html_sample .= "<h2>Разработчик: <span style = 'font-size:18px; font-weight: normal;'>".$games[$key]["developer"]."</span></h2>";
    $html_sample .= "<img style = 'height: 300px;'src='imgs/".$games[$key]["poster"]."'>";
    $html_sample .= "</div>";
    $html_sample .= "<footer><p>Group: JPTV20</p><p>Name: Aleksei Kozlov</p></footer>";
}

$html_sample .= `</body>
</html>`;
echo $html_sample;
?>