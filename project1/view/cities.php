<?php 
//include_once ("header_footer/header.php");
ob_start();
?>
<main>
    <h2>СПИСОК ГОРОДОВ ПО КОНТИНЕНТАМ</h2>
    <form name="filter" id="filter">
        <select name="continents_list" id="continents_list">
            <option value="--" disabled selected>List continents</option>
        </select>
        <select name="countries_list" id=""></select>
    </form>
    
</main>
<script src="../assets/scripts/cities.js"></script>
<?php
$content = ob_get_clean();
include("view/templates/layout.php");
?>