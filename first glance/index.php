<?php
$servername = "localhost";
$username = "MiFista";
$password = "Al2ek0s01";
$dbname = "mifista";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM persons";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    echo "PersonID: " . $row["PersonID"]. "/ Name: " . $row["FirstName"]."/ LastName: " . $row["LastName"]."/ Address: " . $row["Address"]. "/ City: " . $row["City"]."<br>";
  }
}
$games_array = ['name'=>"Noita"];

    
$create_table = "CREATE TABLE games(
    name NVARCHAR(500),
    genres NVARCHAR(500),
    description NVARCHAR(500),
    developer NVARCHAR(500),
    poster NVARCHAR(500),
    anchor NVARCHAR(500)
)";
   

$query = mysqli_query($conn,"SHOW TABLES FROM `mifista` like 'persons'");
$result = mysqli_fetch_array($query);
$count = 0;
foreach($result as $key){
  $count ++;
  echo $key."<br>";
  echo $count;
}
$conn->close();
?>