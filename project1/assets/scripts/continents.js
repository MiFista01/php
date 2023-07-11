let categories
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
                user = true;
            }
        }
    });
    $("#all").click(function (e) { 
        e.preventDefault();
        for( let i of $(".table").children()){
            $(i).show();
        }
    });
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:2, query:{field:"country", where:"", order:" Continent ASC", distinct:"Continent", count:""}}, //получение всех стран
        dataType: "html",
        success: function (response) {
            let datas = JSON.parse(response);
            let count = 0
            datas.forEach(element => {
                creat_row_from_category(element.Continent);
                let text = document.createElement("p")
                text.id = element.Continent.replace(" ","_")
                text.textContent = element.Continent
                $(text).click(function (e) { 
                    e.preventDefault();
                    for( let i of $(".table").children()){
                        if (i.id != e.target.id.replace("_"," ") && i.id !=""){
                            $(i).hide();
                        }else{
                            $(i).show();
                        }
                        
                    }
                });
                $(".categories").append(text);
                count += 1
            });
            $("#count").text(count);
        }
    });
});

function creat_row_from_category(continent){
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:2, query:{field:"country", where:"Continent,"+continent, order:" Continent ASC", distinct:"", count:""}}, //получение всех стран
        dataType: "html",
        success: function (response) {
            let data = JSON.parse(response)
            let row = document.createElement("div")
            row.id = continent
            row.className = "row"
            let cell = document.createElement("div");
            cell.className = "cell"
            let text = document.createElement("p");
            text.textContent = continent;
            cell.appendChild(text);
            row.appendChild(cell)
            let content = document.createElement("div");
            content.className = "content"
            for(let i of data){
                if(i.status == 0){
                    let row_content = document.createElement("div");
                    row_content.className = "row_content";
                    for(let j in i){
                        if(j != "Continent" && j != "Code2" && j != "status"){
                            let cell = document.createElement("div");
                            cell.className = "cell"
                            let text = document.createElement("p");
                            text.textContent = i[j];
                            cell.id = j
                            cell.appendChild(text);
                            row_content.appendChild(cell)
                        }
                    }
                    let cell_button = document.createElement("div");
                    cell_button.className = "cell";
                    cell_button.id = "buttons"
                    let edit = document.createElement("button");
                    edit.textContent = "Edit";
                    edit.className = "edit"
                    edit.id = i.Code;
                    $(edit).click(function (e) { 
                        e.preventDefault();
                        let row = $($(e.target).parentsUntil(".row")[1]).children();
                        creat_updatetable(row,e)
                        
                    });
                    let delet = document.createElement("button");
                    delet.textContent = "Delete";
                    delet.className = "delet"
                    delet.id = i.Code;
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
                                }else{
                                }
                            }
                        });
                    });
                    cell_button.appendChild(edit)
                    cell_button.appendChild(delet)
                    if (user == true){
                        $(delet).show();
                        $(edit).show();
                    }else{
                        $(delet).hide();
                        $(edit).hide();
                    }
                    row_content.appendChild(cell_button)
                    content.appendChild(row_content)
                }
                }
                
            row.appendChild(content)
            $(".table").append(row);
        }
    });
}
function creat_updatetable(element,e){
    let obj = element.slice(0)
    delete obj[7]
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
                        $(e.target).children()[8].textContent = "Result: Successful";
                        for(let i of form){
                            for (let j of element){
                                if(i.name == j.id){
                                    j.textContent = i.value;
                                    break;
                                }
                            }
                            
                        }
                    }else{
                        $(e.target).children()[8].textContent = "Result: Fail";
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