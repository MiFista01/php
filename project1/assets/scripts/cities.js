$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:2, query:4},//получение уникальных значений
        dataType: "html",
        success: function (response) {
            let dates = JSON.parse(response);
            dates.forEach(element => {
                let option = document.createElement("option")
                option.id = element["Continent"].replace(" ","_")
                option.text = element["Continent"]
                $("#continents_list").append(option);
            });
        }
    });
    $("#continents_list").change(function (e) { 
        console.log(e.target.value)
    });
});