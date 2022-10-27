// var cells = ["Code","Country","Continent","Region","IndepYear","Population","GovernmentForm","HeadOfState"];
var continents = ["Asia","Europe","North America","Africa","Oceania","Antarctica","South America"]
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
                if(element.status == 0){
                    let row = document.createElement("div");
                    row.className = "row";
                    delete element.Code2
                    delete element.status
                    for(let i in element){
                        let cell = document.createElement("div");
                        cell.className = "cell";
                        cell.id = i;
                        let text = document.createElement("p");
                        if (element[i] == null){
                            text.textContent = "NULL";
                        }else{
                            text.textContent = element[i];
                        }
                        
                        cell.appendChild(text);
                        row.appendChild(cell);
                    }
                    let cell_button = document.createElement("div");
                    cell_button.className = "cell";
                    cell_button.id = "buttons"
                    let edit = document.createElement("button");
                    edit.textContent = "Edit";
                    edit.className = "edit"
                    edit.id = element.Code;
                    $(edit).click(function (e) { 
                        e.preventDefault();
                        let row = $($(e.target).parentsUntil(".table")[1]).children();
                        creat_updatetable(row,e)
                        
                    });
                    let delet = document.createElement("button");
                    delet.textContent = "Delete";
                    delet.className = "delet"
                    delet.id = element.Code;
                    $(delet).click(function (e) { 
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
                    cell_button.appendChild(edit)
                    cell_button.appendChild(delet)
                    row.appendChild(cell_button)
                    $(".table").append(row);
                }
            });
            creat_addtable(dates)
        }
    });
});

function creat_updatetable(element,e){
    let obj = element.slice(0)
    delete obj[8]
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
            datas.set("field","country")
            for(let i of form){
                if(i.name != ""){
                    datas.set(i.name,i.value)
                }else{
                    datas.set("code",i.id)
                }
            }
            $.ajax({
                type: "post",
                url: "../configs/connect.php",
                data: {status: 4, dates: Object.fromEntries(datas)},
                dataType: "html",
                success: function (response) {
                    if(response == 1){
                        $(e.target).children()[9].textContent = "Result: Successful";
                        for(let i of form){
                            for (let j of element){
                                if(i.name == j.id){
                                    j.textContent = i.value;
                                    break;
                                }
                            }
                            
                        }
                    }else{
                        $(e.target).children()[9].textContent = "Result: Fail";
                    }
                }
            });
        });
       
    }
}
function creat_addtable(dates){
    let form = document.createElement("Form");
    form.className = "add_form";
    for(let i of Object.keys(dates[0])){
        if(i != "status" && i != "Code2"){
            let cell = document.createElement("div");
            cell.className = "cell";
            if(i != "Continent"){
                let input = document.createElement("input");
                if (i == "Code"){
                    input.maxLength = 3
                }
                if (i == "IndepYear" || i == "Population"){
                    input.type = "number";
                }
                input.name = i;
                input.required = true;
                input.placeholder = i;
                cell.appendChild(input);
            }else{
                let select = document.createElement("select");
                select.name = "Continent";
                select.required = true;
                for(let j of continents){
                    let option = document.createElement("option");
                    option.value = j
                    option.textContent = j
                    select.appendChild(option)
                }
                cell.appendChild(select)
            }
            form.appendChild(cell)
        }
        
    }
    let cell = document.createElement("div");
    cell.className = "cell"
    let button = document.createElement("button");
    button.textContent = "ADD"
    cell.appendChild(button)
    form.appendChild(cell)
    let result = document.createElement("p");
    result.id = "result"
    result.textContent = "Result:--"
    form.appendChild(result);
    $(form).submit(function (e) { 
        e.preventDefault();
        let datas = new Map()
        datas.set("field","country")
        for(let i of form){
            if(i.name != ""){
                datas.set(i.name,i.value)
            }
        }
        $.ajax({
            type: "post",
            url: "../configs/connect.php",
            data: {status: 3, dates: Object.fromEntries(datas)},
            dataType: "html",
            success: function (response) {
                if(response == 1){
                    let values_form = Object.fromEntries(datas);
                    delete values_form.field
                    let row = document.createElement("div");
                    row.className = "row";
                    Object.keys(values_form).forEach(element => {
                        let cell = document.createElement("div");
                        cell.className = "cell";
                        cell.id = element;
                        let text = document.createElement("p");
                        if (element == undefined){
                            text.textContent = "NULL";
                        }else{
                            text.textContent = values_form[element];
                        }
                        
                        cell.appendChild(text);
                        row.appendChild(cell);
                    });
                    let cell_button = document.createElement("div");
                    cell_button.className = "cell";
                    cell_button.id = "buttons"
                    let edit = document.createElement("button");
                    edit.textContent = "Edit";
                    edit.className = "edit"
                    edit.id = values_form.Code;
                    $(edit).click(function (e) { 
                        e.preventDefault();
                        let row = $($(e.target).parentsUntil(".table")[1]).children();
                        creat_updatetable(row,e)
                        
                    });
                    let delet = document.createElement("button");
                    delet.textContent = "Delete";
                    delet.className = "delet"
                    delet.id = values_form.Code;
                    $(delet).click(function (e) { 
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
                    cell_button.appendChild(edit)
                    cell_button.appendChild(delet)
                    row.appendChild(cell_button)
                    $(".table").append(row);
                    $(e.target).children()[9].textContent = "Result: Successful";
                }else{
                    $(e.target).children()[9].textContent = "Result: Fail";
                }
            }
        });
    });
    $(form).insertAfter(".table");
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