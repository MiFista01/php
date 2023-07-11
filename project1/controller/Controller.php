<?php
class Controller { 

   public static function HomePage(){
    include_once "view/homepage.php";
    return;
   }
   public static function Countries(){
      include_once "view/countries.php";
      return;
   }
   public static function Continents(){
      include_once "view/continents.php";
      return;
   }
   public static function Cities(){
      include_once "view/cities.php";
      return;
   }
   public static function Deleted_all(){
      include_once "view/deleted_all.php";
      return;
   }
   
   public static function error404(){
    include_once "view/error404.php";
    return;
   }
	
}//END CLASS
?>















