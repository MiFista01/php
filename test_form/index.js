$(document).ready(function () {
    $("#button").click(function (e) { 
        e.preventDefault();
        const formData = new FormData(document.getElementById("form"));
        $.ajax({
            type: "post",
            url: "form.php",
            data: {"name":formData.get("name"),
                    "email":formData.get("email"),
                    "text":formData.get("text")},
            dataType: "html",
            success: function (response) {
                console.log(typeof(response));
                $("#problem").html(response);
            }
        });
    });
});