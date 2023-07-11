<?php
/*URI унифицированный идентификатор ресурса, 
	который был предоставлен для доступа к странице
знак ? отделяет полный путь и значение 
	переменной идентификатора для фильтрации
*/
$host = explode('?', $_SERVER['REQUEST_URI']);
//полный путь к проекту до знака ?
$path=$host[0];
	//количество папок вложений - считаем символы "/"
	$num = substr_count($path, '/');
	//вычисляем маршрут после последнего символа "/"
	$route = explode('/', $path)[$num];
//значение переменной - идентификатора фильтрации - после знака ?
if(strstr($_SERVER['REQUEST_URI'],'?')){//если найден символ '?'
	$id=urldecode($host[1]);//прочитаем значение из адресной строки и уберем пробелы
}
//-----------------------

if ($route == "" or $route == "index.php"){
	Controller::HomePage();
}
elseif ($route == "countries"){
	Controller::Countries();
}
elseif ($route == "continent"){
	Controller::Continents();
}
elseif ($route == "cities"){
	Controller::Cities();
}elseif ($route == "deleted"){
	Controller::Deleted_all();
}
else{
	Controller::error404();
}