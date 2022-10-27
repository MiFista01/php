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
        <select name="countries_list" id="countries_list">
        <option value="--" disabled selected>List contries</option>
        </select>
        
    </form>
    <div class="table">
        <div class="row_header">
            <h4>Name</h4>
            <h4>Country Code</h4>
            <h4>population</h4>
            <h4>BUTTONS</h4>
        </div>
    </div>
    <p class="count">Total continents: <span id="count"></span></p>
</main>
<script src="../assets/scripts/cities.js"></script>
<?php
$content = ob_get_clean();
include("view/templates/layout.php");
?>