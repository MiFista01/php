<?php 
//include_once ("header_footer/header.php");
ob_start();
?>
<main>
    <h2>СПИСОК ГОРОДОВ ПО КОНТИНЕНТАМ И СТРАНАМ</h2>
    <form name="filter" id="filter">
        <select name="continents_list" id="continents_list">
            <option value="--" disabled selected>List continents</option>
        </select>
        <select name="countries_list" id="countries_list">
        <option value="--" disabled selected>List contries</option>
        </select>
        
    </form>
    <div class="table">
        <div class="row_header" id="row_header">
            <h4>Name</h4>
            <h4>Country Code</h4>
            <h4>population</h4>
            <h4>BUTTONS</h4>
        </div>
    </div>
    <form class="add_form">
        <div class="row">
            <div class="cell">
                <input type="text" placeholder="Name" required name="Name">
            </div>
            <div class="cell">
                <select name="CountryCode" id="countryCode" required>

                </select>
            </div>
            <div class="cell">
                <input type="number" placeholder="Population" required name="Population">
            </div>
            <div class="cell">
                <button>ADD</button>
            </div>
        </div>
    </form>
    <p class="count">Total continents: <span id="count"></span></p>
</main>
<script src="../assets/scripts/cities.js"></script>
<?php
$content = ob_get_clean();
include("view/templates/layout.php");
?>