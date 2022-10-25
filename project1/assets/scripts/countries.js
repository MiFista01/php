let cell
$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:2, query:{field:"country", where:"", order:" Name ASC", distinct:"", count:""}}, //получение всех стран
        dataType: "html",
        success: function (response) {
            let dates = JSON.parse(response)
            $("#count").text(dates.length);
            $(".rows").html("");
            dates.forEach(element => {
                let row = document.createElement("div");
                row.className = "row";
                let row_dates = {code:"",name:"",indepYear:"",population:"",continent:"",governmentForm:""};
                for(let i in element){
                    if (i == "Code"){
                        row_dates.code = element[i];
                    }
                    if (i == "Name"){
                        row_dates.name = element[i];
                    }
                    if (i == "IndepYear"){
                        row_dates.indepYear = element[i];
                    }
                    if (i == "Population"){
                        row_dates.population = element[i];
                    }
                    if (i == "Continent"){
                        row_dates.continent = element[i];
                    }
                    if (i == "GovernmentForm"){
                        row_dates.governmentForm = element[i];
                    }
                }
                for(let i in row_dates){
                    let cell = document.createElement("div");
                    cell.className = "cell";
                    let text = document.createElement("p");
                    if (row_dates[i] == null){
                        text.textContent = "NULL";
                    }else{
                        text.textContent = row_dates[i];
                    }
                    
                    cell.appendChild(text);
                    row.appendChild(cell);
                }
                let cell = document.createElement("div");
                cell.className = "cell button";
                row.appendChild(cell)
                $(".table").append(row);
            });
        }
    });
});