<?php
include_once("header.php");
include_once("contact_header.php");
?>
<form class="form-horizontal" method="post" id="form">
    <fieldset>

    <!-- Form Name -->
    <legend>Form Name</legend>

    <!-- Text input-->
    <div class="form-group">
        <label class="col-md-4 control-label" for="name">Name</label>  
        <div class="col-md-4">
            <input id="name" name="name" type="text" placeholder="Your name" class="form-control input-md">
        </div>
    </div>

    <!-- Text input-->
    <div class="form-group">
        <label class="col-md-4 control-label" for="email">Email</label>  
        <div class="col-md-4">
            <input id="email" name="email" type="text" placeholder="Your email" class="form-control input-md">
        </div>
    </div>

    <!-- Textarea -->
    <div class="form-group">
        <label class="col-md-4 control-label" for="textarea">Message</label>
        <div class="col-md-4">                     
            <textarea class="form-control" id="text" name="text" placeholder="Your message"></textarea>
        </div>
    </div>

    <!-- Button -->
    <div class="form-group">
        <label class="col-md-4 control-label" for="singlebutton"></label>
        <div class="col-md-4">
            <button id="button" name="button" class="btn btn-default">SandMessage</button>
        </div>
    </div>
    </fieldset>
</form>
<p id="problem"></p>
<?php
include_once("footer.php");
?>