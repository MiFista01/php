<?php
include_once("header.php");
?>
<form class="form-horizontal" method="post" id="myForm">
<fieldset>

<!-- Form Name -->
<legend>Order Pizza</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="name">Name</label>  
  <div class="col-md-4">
    <input required id="name" name="name" type="text" placeholder="Your name" class="form-control input-md" value="kbl">
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="adress">Adress</label>  
  <div class="col-md-4">
    <input required id="adress" name="adress" type="text" placeholder="Your adress" class="form-control input-md" value="ksdgjkbl">
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="phone">Phone</label>  
  <div class="col-md-4">
    <input required id="phone" name="phone" type="number" placeholder="Your phone" class="form-control input-md" value="6546554">
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="email">Email</label>  
  <div class="col-md-4">
    <input required id="email" name="email" type="email" placeholder="Your email" class="form-control input-md" value = "sdnkjfv@ivkhk.ee">
  </div>
</div>

<!-- Select Basic -->
<div class="form-group">
  <div class="select_kind">
    <label class="col-md-4 control-label" for="kind">Pizza kind</label>
    <div class="col-md-4">
      <select required id="kind" name="kind" class="form-control"></select>
      <input type="button" value="ADD" id="add">
    </div>
  </div>
  <p>Summa - <span id="summa">0</span>€</p>
  <div id="get_select"></div>
  <p>using a comma if you want to make multiple wishes for the same type of pizza</p>
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
<p id="wait"></p>

<div id=result>

</div>
<?php
include_once("footer.php");
?>