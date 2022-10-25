<?php 
	ob_start();
 ?>
 
	<div class="center" >
		<img src="../imgs/404.png" >    
	</div> 

<?php 
	$content = ob_get_clean(); 
	include "view/templates/layout.php";
?>