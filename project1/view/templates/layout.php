
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='../assets/styles/style.css'>
    <script src='../assets/scripts/jquery-3.6.1.min.js'></script>
</head>
<body>
    <header>
        <h1><a href="./">Сountries of the World</a></h1>
        <div>
            <h2><a href="countries">ГОСУДАРСТВА</a></h2>
            <h2><a href="cities">ГОРОДА</a></h2>
            <h2><a href="continent">КОНТИНЕНТЫ</a></h2>
        </div>
    </header>
	<?php
	if(isset($content)){
		echo $content;
	}
	?>
						
	<!-- start footer -->
	<footer>
		<p>Copyright © 2022 Сountries of the world</p>
	</footer>
	<!-- end footer -->
</div>

</body>
</html>