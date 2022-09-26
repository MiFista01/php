<?php
include_once("header.php");
?>
<form class="form-horizontal" method="post" id="myForm">
<fieldset>

<!-- Form Name -->
<legend>Form Name</legend>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="name">Name</label>  
  <div class="col-md-4">
  <input required id="name" name="name" type="text" placeholder="Your name" class="form-control input-md" value="sdfmn,bhxdvbhksdgjkbl">
    
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="adress">Adress</label>  
  <div class="col-md-4">
  <input required id="adress" name="adress" type="text" placeholder="Your adress" class="form-control input-md" value="sdfmn,bhxdvbhksdgjkbl">
    
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
  <input required id="email" name="email" type="email" placeholder="Your email" class="form-control input-md" value = "klsdnnlknvkasdnfvkbjsdnkjfv@ivkhk.ee">
    
  </div>
</div>

<!-- Select Basic -->
<div class="form-group">
  <label class="col-md-4 control-label" for="kind">Pizza kind</label>
  <div class="col-md-4">
    <select required id="kind" name="kind" class="form-control">
      
    </select>
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-4 control-label" for="count">Count</label>  
  <div class="col-md-4">
  <input required id="count" name="count" type="number" placeholder="Pizza count" class="form-control input-md" min="1" value="6546554">
    
  </div>
</div>

<!-- Textarea -->
<div class="form-group">
  <label class="col-md-4 control-label" for="textarea">Message</label>
  <div class="col-md-4">                     
    <textarea required class="form-control" id="textarea" name="textarea">Your message</textarea>
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
<div id=result>
</div>
<?php
include_once("footer.php");
?>