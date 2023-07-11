<?php
/* для выборки данных из базы данных используем запросы,
 * class database из папки inc
 */
class Models {
    public static function check_user($dates){
        $sql = "SELECT * FROM users WHERE name LIKE '".$dates["name"]."' AND password LIKE '".$dates["password"]."'";
        
       return $sql;
    }
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
            $sql .= " WHERE ".$fields[0]." LIKE '".$fields[1]."' AND status = 0";
            if ($dates["order"] != ""){
                $sql .= " ORDER BY".$dates["order"];
            }
        }else{
            if ($dates["order"] != ""){
                $sql .= " WHERE status = 0 ORDER BY".$dates["order"];
            }
        }
       

       return $sql;
    }
    public static function all_deleted_country($dates){
        $sql = "SELECT Name, Code FROM ".$dates['field']." WHERE status = 1";
        return $sql;
    }
    public static function all_deleted_city($dates){
        $sql = "SELECT Name, ID FROM ".$dates['field']." WHERE status = 1";
        return $sql;
    }
    public static function creat($dates){
        $sql = "INSERT INTO ".$dates["field"];
        $tables = " (";
        $values = " (";
        foreach ($dates as $key => $val) {
            if($key != "field"){
                if($key != "HeadOfState"){
                    $tables .= $key.", ";
                    $values .= "'".$val."', ";
                }
                else{
                    $tables .= $key.")";
                    $values .= "'".$val."')";
                }
            }
            
        }
        return $sql.$tables." VALUES ".$values;
    }
    public static function creat_city($dates){
        $sql = "INSERT INTO ".$dates["field"];
        $tables = " (";
        $values = " (";
        $keys = "";
        foreach ($dates as $key => $val) {
            if($key != "field"){
                $keys .= $key;
                if($key != "Population"){
                    $tables .= $key.", ";
                    $values .= "'".$val."', ";
                }
                else{
                    $tables .= $key.")";
                    $values .= "'".$val."')";
                }
            }
            
        }
        
        return $sql.$tables." VALUES ".$values;
    }
    public static function update_country($dates){
        $sql = "UPDATE ".$dates["field"]." SET ";
        foreach ($dates as $key => $value) {
            if($key != "field" && $key != "code"){
                if($key != "HeadOfState"){
                    $sql .= $key." = '".$value."', ";
                }else{
                    $sql .= $key." = '".$value."' ";
                }
                
            }
            
        }
        $sql .= "WHERE Code LIKE '".$dates["code"]."'";
        return $sql;
    }
    public static function update_city($dates){
        $sql = "UPDATE ".$dates["field"]." SET ";
        foreach ($dates as $key => $value) {
            if($key != "field" && $key != "code"){
                if($key != "Population"){
                    $sql .= $key." = '".$value."', ";
                }else{
                    $sql .= $key." = '".$value."' ";
                }
                
            }
            
        }
        $sql .= "WHERE ID LIKE '".$dates["code"]."'";
        return $sql;
    }
    public static function delete($dates){
        $sql = "UPDATE ".$dates["field"]." SET status = 1 WHERE ".array_keys($dates)[1]." LIKE '".$dates[array_keys($dates)[1]]."'";
        return $sql;
    }
	public static function reestablish($dates)
    {
        $sql = "UPDATE ".$dates["field"]." SET status = 0 WHERE ".array_keys($dates)[1]." LIKE '".$dates[array_keys($dates)[1]]."'";
        return $sql;
    }
}//END CLASS
?>