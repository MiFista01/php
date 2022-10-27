<?php 
//include_once ("header_footer/header.php");
ob_start();
?>
<main>
    <h2>СПИСОК СТРАН</h2>
    <div class="table">
        <div class="row_header">
            <h4>Code</h4>
            <h4>Country name</h4>
            <h4>Continent</h4>
            <h4>Region</h4>
            <h4>IndepYear</h4>
            <h4>Population</h4>
            <h4>GovernmentForm</h4>
            <h4>Head of state</h4>
            <h4>BUTTONS</h4>
        </div>
    </div>
    <p class="count">Total countries: <span id="count"></span></p>
</main>
<script src="../assets/scripts/countries.js"></script>
<?php
$content = ob_get_clean();
include("view/templates/layout.php");
?>