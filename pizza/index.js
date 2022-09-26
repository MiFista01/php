$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "data_pizza.php",
        data: {"status":1},
        dataType: "html",
        success: function (data) {
            var dates = JSON.parse(data);
            var text = "<option selected value = '0'>Please select pizza</option>";
            for(i of dates){
                text += "<option value = '"+i["anchor"]+"'>";
                text += i["name"]+" "+i["prise"];
                text += "</option>"
            }
            $("#kind").html(text);
        }
    });
    $("#myForm").submit(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "form.php",
            data: $(this).serialize(),
            dataType: "html",
            success: function (response) {
                console.log(response);
                if (response == 0){
                    $("#result").html("<h2 style='color:red;'>Проблема ввода</h2>");
                }else{
                    $("#result").html(response);
                }
            }
        });
    });
});