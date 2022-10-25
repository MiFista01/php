<?php 
//include_once ("header_footer/header.php");
ob_start();
?>
<main>
    <h2>СПИСОК СТРАН ПО КОНТИНЕНТАМ</h2>
    <div class="categories"><p id="all">All</p></div>
    <div class="table">
        <div class="row_header">
            <h4>Continent</h4>
            <h4>Code</h4>
            <h4>Country name</h4>
            <h4>Population</h4>
            <h4>IndepYear</h4>
            <h4>Cities</h4>
        </div>
    </div>
    <form class="add_from_continents" name="Myform">
        <div class="row_form">
            <div class="cell">
            <select name="Continent" id="" size="1">
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctica">Antarctica</option>
                <option value="South America">South America</option>
            </select></div>
            <div class="cell"><input required type="text" maxlength="3" placeholder="Code" name="Code"></div>
            <div class="cell"><input required type="text" placeholder="Country name" name="name"></div>
            <div class="cell"><input required type="number" placeholder="Population" name="Population"></div>
            <div class="cell"><input required type="number" size="3" placeholder="IndepYear" name="IndepYear"></div>
            <button>Add</button>
        </div>
    </form>
    <p class="count">Result: <span id="result">--</span></p>
    <p class="count">Total continents: <span id="count"></span></p>
</main>
<script src="../assets/scripts/continents.js"></script>

<?php
$content = ob_get_clean();
include("view/templates/layout.php");
?>