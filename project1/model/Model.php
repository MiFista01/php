<?php
/* для выборки данных из базы данных используем запросы,
 * class database из папки inc
 */
class Models {
	public static function get_dates($dates){
        if ($dates["distinct"] == "" && $dates["count"] == ""){
            $sql = "SELECT * FROM ".$dates["field"];
            
        }else{
            if($dates["distinct"] != ""){
                $sql = "SELECT DISTINCT ".$dates["distinct"]." FROM ".$dates["field"];
            }
            if($dates["count"] != ""){
                $sql = "SELECT COUNT(".$dates["count"].") AS count FROM ".$dates["field"];
            }
        }
        if ($dates["where"] != ""){
            $fields = explode(",", $dates["where"]);
            $sql .= " WHERE ".$fields[0]." LIKE '".$fields[1]."'";
        }
        if ($dates["order"] != ""){
            $sql .= " ORDER BY ".$dates["order"];
        }

       return $sql;
    }
    public static function creat($dates){
        $sql = "INSERT INTO ".$dates["field"]." (Code, Name, Continent, IndepYear, Population) VALUES('".$dates["code"]."', '".$dates["name"]."', '".$dates["continent"]."', ".$dates["year"].", ".$dates["population"].")";
        return $sql;
    }
    public static function update($dates){
        $sql = "UPDATE ".$dates["field"]." SET Continent = '".$dates["continent"]."', Name = '".$dates["name"]."', Population = '".$dates["population"]."', IndepYear = '".$dates["year"]."' WHERE Code LIKE '".$dates["code"]."'";
        return $sql;
    }
    public static function delete($dates){
        $sql = "UPDATE ".$dates["field"]." SET Status = 1 WHERE Code LIKE '".$dates["code"]."'";
        return $sql;
    }
	
}//END CLASS
?>