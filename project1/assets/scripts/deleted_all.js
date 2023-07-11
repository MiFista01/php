let user = false
$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "../configs/user.php",
        dataType: "html",
        success: function (response) {
            if(response != ""){
                let result = `<div class='user'>
                <img src='../assets/imgs/user.png'>
                <p>`+response+`</p>
                <form class="logOut">
                    <button>logOut</button>
                </form>
                </div>`
                $(result).insertAfter(".user_form");
                $(".user_form").remove();
                user = true
            }
        }
    });
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:7, query:{field:"country", where:"", order:"", distinct:"", count:""}},//получение уникальных значений
        dataType: "html",
        success: function (response) {
            let data = JSON.parse(response);
            data.forEach(element => {
            let row = document.createElement("div")
            row.className = "row";
            let cell = document.createElement("div")
            cell.className = "cell"
            let text = document.createElement("p");
            text.textContent = element.Name;
            let cell_button = document.createElement("div");
            cell_button.className = "cell"
            let button = document.createElement("button");
            button.textContent = "REESTABLISH"
            button.id = element.Code
            button.className = "reestablish"
            $(button).click(function (e) { 
                e.preventDefault();
                $.ajax({
                    type: "post",
                    url: "../configs/connect.php",
                    data: {status:10, form:{field:"country",Code: e.target.id}},//получение уникальных значений
                    dataType: "html",
                    success: function (response) {
                        if(response == 1){
                            $(e.target).parentsUntil(".table")[1].remove()
                        }
                    }
                });
                
            });
            if (user == true){
                $(button).show();
            }else{
                $(button).hide();
            }
            cell.appendChild(text)
            row.appendChild(cell)
            cell_button.appendChild(button)
            row.appendChild(cell_button)
            $(".table").append(row);
            });
            let hr = document.createElement("hr");
            hr.style.margin = "10px 0px"
            hr.style.height = "0.2vh"
            hr.style.background = "grey";
            $(".table").append(hr);
            $.ajax({
                type: "post",
                url: "../configs/connect.php",
                data: {status:9, query:{field:"city", where:"", order:"", distinct:"", count:""}},//получение уникальных значений
                dataType: "html",
                success: function (response) {
                    let data = JSON.parse(response);
                    data.forEach(element => {
                        let row = document.createElement("div")
                        row.className = "row";
                        let cell = document.createElement("div")
                        cell.className = "cell"
                        let text = document.createElement("p");
                        text.textContent = element.Name;
                        let cell_button = document.createElement("div");
                        cell_button.className = "cell"
                        let button = document.createElement("button");
                        button.textContent = "REESTABLISH"
                        button.id = element.ID
                        button.className = "reestablish"
                        $(button).click(function (e) { 
                            e.preventDefault();
                            $.ajax({
                                type: "post",
                                url: "../configs/connect.php",
                                data: {status:10, form:{field:"city",ID: e.target.id}},//получение уникальных значений
                                dataType: "html",
                                success: function (response) {
                                    if(response == 1){
                                        $(e.target).parentsUntil(".table")[1].remove()
                                    }
                                }
                            });
                            
                        });
                        cell.appendChild(text)
                        row.appendChild(cell)
                        if (user == true){
                            console.log("AAAAAA")
                            $(button).show();
                        }else{
                            console.log("AAAAAA")
                            $(button).hide();
                        }
                        cell_button.appendChild(button)
                        row.appendChild(cell_button)
                        $(".table").append(row);
                    });
                }
            });
        }
    });
});