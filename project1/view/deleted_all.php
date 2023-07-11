<?php 
//include_once ("header_footer/header.php");
ob_start();
?>
<main>
    <h2>СПИСОК удалённых элементов</h2>
    <div class="table">
        <div class="row_header" id="row_header">
            <h4>Name</h4>
            <h4>BUTTONS</h4>
        </div>
    </div>
</main>
<script src="../assets/scripts/deleted_all.js"></script>
<?php
$content = ob_get_clean();
include("view/templates/layout.php");
?>