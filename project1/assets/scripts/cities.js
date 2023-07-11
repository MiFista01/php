let user = false;
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
        data: {status:2, query:{field:"country", where:"", order:" Continent ASC", distinct:"Continent", count:""}},//получение уникальных значений
        dataType: "html",
        success: function (response) {
            let dates = JSON.parse(response);
            dates.forEach(element => {
                let option = document.createElement("option")
                option.id = element["Continent"].replace(" ","_")
                option.text = element["Continent"]
                option.value = element["Continent"]
                $("#continents_list").append(option);
            });
        }
    });
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:2, query:{field:"country", where:"", order:" Continent ASC", distinct:"", count:""}},//получение уникальных значений
        dataType: "html",
        success: function (response) {
            let data = JSON.parse(response);
            for(let i of data){
                let option = document.createElement("option");
                option.value = i.Code;
                option.text = i.Code
                $("#countryCode").append(option);
            }
        }
    });
    $(".add_form").submit(function (e) { 
        e.preventDefault();
        let datas = new Map()
        datas.set("field","city")
        for(let i of e.target){
            if(i.name != ""){
                datas.set(i.name,i.value)
            }
        }
        $.ajax({
            type: "post",
            url: "../configs/connect.php",
            data: {status: 8, dates: Object.fromEntries(datas)},
            dataType: "html",
            success: function (response) {
                if(response == 1){
                    for(let i of e.target){
                        if(i.name != ""){
                            i.value = ""
                        }
                    }
                }
            }
        });
        
    });
    $("#continents_list").change(function (e) { 
        $.ajax({
            type: "post",
            url: "../configs/connect.php",
            data: {status:2, query:{field:"country", where:"Continent,"+e.target.value, order:" Name ASC", distinct:"", count:""}},//получение уникальных значений
            dataType: "html",
            success: function (response) {
                let data = JSON.parse(response)
                $("#countries_list").empty();
                let option = document.createElement("option")
                option.value = "--";
                option.text = "List contries";
                option.disabled = true;
                option.selected = true
                $("#countries_list").append(option);
                for( let i of data){
                    if(i.status != 1){
                        let option = document.createElement("option")
                    option.value = i.Code;
                    option.text = i.Name;
                    $("#countries_list").append(option);
                    }
                }
            }
        });
    });
    $("#countries_list").change(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "../configs/connect.php",
            data: {status:2, query:{field:"city", where:"CountryCode,"+e.target.value, order:" CountryCode ASC", distinct:"", count:""}},//получение уникальных 
            success: function (response) {
                let data = JSON.parse(response)
                $(".table").empty();
                $("#count").text(data.length);
                $(".table").html(`<div class="row_header" id="row_header">
                <h4>Name</h4>
                <h4>Country Code</h4>
                <h4>population</h4>
                <h4>BUTTONS</h4>
            </div>`);
                for (let i of data){
                    let row = document.createElement("div")
                    row.className = "row"
                    Object.keys(i).forEach(element => {
                        if(element !="status"){
                            if(element != "ID"){
                                let cell = document.createElement("div")
                                cell.className = "cell";
                                cell.id = element
                                let text = document.createElement("p")
                                text.textContent = i[element]
                                cell.appendChild(text)
                                row.appendChild(cell)
                            }
                        }
                    });
                    let cell_button = document.createElement("div");
                        cell_button.className = "cell";
                        cell_button.id = "buttons"
                        let edit = document.createElement("button");
                        edit.textContent = "Edit";
                        edit.className = "edit"
                        edit.id =  i.ID;
                        $(edit).click(function (e) { 
                            e.preventDefault();
                            let row = $($(e.target).parentsUntil(".table")[1]).children();
                            creat_updatetable(row,e)
                            
                        });
                        let delet = document.createElement("button");
                        delet.textContent = "Delete";
                        delet.className = "delet"
                        delet.id =  i.ID;
                        $(delet).click(function (e) {
                            e.preventDefault();
                            $.ajax({
                                type: "post",
                                url: "../configs/connect.php",
                                data: {status:5, form:{field:"city",id: e.target.id}},
                                dataType: "html",
                                success: function (response) {
                                    console.log(response)
                                    if(response == 1){
                                        let row = $($(e.target).parentsUntil(".table")[1]).children();
                                        $(row.prevObject).remove();
                                    }
                                }
                            });
                        });
                        if (user == true){
                            $(delet).show();
                            $(edit).show();
                        }else{
                            $(delet).hide();
                            $(edit).hide();
                        }
                        cell_button.appendChild(edit)
                        cell_button.appendChild(delet)
                        row.appendChild(cell_button)
                    $(".table").append(row);
                }
            }
        });
        
    });
});
function creat_updatetable(element,e){
    let obj = element.slice(0)
    delete obj[3]
    let form = document.createElement("form");
    form.className = "update_continents";
    form.name = "Myform"
    let count = element.length-1;
    for(let i of obj){
        try {
            let cell = document.createElement("div");
            cell.className = "cell";
            let elem;
            if (i.textContent == e.target.id){
                elem = document.createElement("p");
                elem.textContent = i.textContent;
                
            }else{
                elem = document.createElement("input");
                elem.name = i.id;
                elem.placeholder = i.id;
                elem.value = i.textContent
                elem.required = true
                if (i.id == "IndepYear" || i.id == "Population"){
                    elem.type = "number";
                }else{
                    elem.type = "text";
                }
            }
            elem.id = i.id;
            
            cell.appendChild(elem)
            form.appendChild(cell)
            count -= 1;
        } catch (error) {
            
        }
        
    }

    if(count == 0){
        element.prevObject.empty();
        let cell = document.createElement("div");
        cell.className = "cell";
        let update = document.createElement("button");
        update.textContent = "UPDATE";
        update.className = "button_forms";
        update.id = e.target.id;
        let cancel = document.createElement("button");
        cancel.textContent = "CANCEL";
        cancel.className = "button_forms";
        cancel.id = e.target.id;
        $(cancel).click(function (e) { 
            e.preventDefault();
            creat_row(element);
        });
        let result = document.createElement("p");
        result.id = "result"
        result.textContent = "Result:--"
        cell.appendChild(update);
        cell.appendChild(cancel);
        form.appendChild(cell);
        form.appendChild(result)

        $($(element.prevObject)).append(form);

        $(form).submit(function (e) { 
            e.preventDefault();
            delete e.target[10]
            let form = e.target;
            let datas = new Map()
            datas.set("field","city")
            for(let i of form){
                if(i.name != ""){
                    datas.set(i.name,i.value)
                }else{
                    datas.set("code",element.prevObject[0].id)
                }
            }
            $.ajax({
                type: "post",
                url: "../configs/connect.php",
                data: {status: 6, dates: Object.fromEntries(datas)},
                dataType: "html",
                success: function (response) {
                    if(response == 1){
                        $(e.target).children()[4].textContent = "Result: Fail";
                        for(let i of form){
                            for (let j of element){
                                if(i.name == j.id){
                                    j.textContent = i.value;
                                    break;
                                }
                            }
                            
                        }
                    }else{
                        $(e.target).children()[4].textContent = "Result: Fail";
                    }
                }
            });
        });
       
    }
}
function creat_row(element){
    element.prevObject.empty()
    for(let i of element){
       $(element.prevObject).append(i);
        if(i.id == "buttons"){
            $($(i).children()[0]).click(function (e) { 
                e.preventDefault();
                let row = $($(e.target).parentsUntil(".table")[1]).children();
                creat_updatetable(row,e)
                
            });
            $($(i).children()[1]).click(function (e) { 
                e.preventDefault();
                $.ajax({
                    type: "post",
                    url: "../configs/connect.php",
                    data: {status:5, form:{field:"country",code: e.target.id}},
                    dataType: "html",
                    success: function (response) {
                        if(response == 1){
                            let row = $($(e.target).parentsUntil(".table")[1]).children();
                            $(row.prevObject).remove();
                        }
                    }
                });
            });
        }
    }
}