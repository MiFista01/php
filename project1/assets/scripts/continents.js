let categories = []
$(document).ready(function () {
    // =============создание всех элементов============================
    $("#all").on("click", function (e) {
        categories.forEach(element => {
            get_from_categories(element.Continent);
        });
    });
    // ==============создание всех элементов===================

    // ===================создание всех категорий====================
    create_categories()
    // ===================создание всех категорий====================

    // ======================форма для добавления новой страны используая континент и вписаные данные===========================
    $(".add_from_continents").submit(function (e) { 
        e.preventDefault();
        let values = {field:"country"} //массив для запроса
        values.continent = e.target.Continent.value;
        values.code = e.target.Code.value;
        values.name = e.target.name.value;
        values.population = e.target.Population.value;
        values.year = e.target.IndepYear.value;
        // =============================ajax для cоздания нового элемента==========================
        $.ajax({
            type: "post",
            url: "../configs/connect.php",
            data: {status:3,form:values},
            dataType: "html",
            success: function (response) {
                if(response == 1){
                    let contents_row = document.createElement("div");
                    contents_row.className = "contents_row";

                    let cell_code = document.createElement("div"); 
                    cell_code.className = "cell";
                    let code = document.createElement("p");
                    code.textContent = e.target.Code.value;

                    let cell_name = document.createElement("div"); 
                    cell_name.className = "cell";
                    let name = document.createElement("p");
                    name.textContent = e.target.name.value;

                    let cell_population = document.createElement("div"); 
                    cell_population.className = "cell";
                    let population = document.createElement("p");
                    population.textContent = e.target.Population.value;

                    let cell_year = document.createElement("div"); 
                    cell_year.className = "cell";
                    let year = document.createElement("p");
                    year.textContent = e.target.IndepYear.value;

                    let cell_button = document.createElement("div");
                    cell_button.className = "cell button";
                    let edit = document.createElement("button");
                    edit.textContent = "Edit";
                    edit.className = "edit"
                    edit.id = e.target.id;
                    let delet = document.createElement("button");
                    delet.textContent = "Delete";
                    delet.className = "delet"
                    delet.id = e.target.id;
                    cell_code.append(code);
                    contents_row.appendChild(cell_code);

                    cell_name.append(name);
                    contents_row.appendChild(cell_name);

                    cell_population.append(population);
                    contents_row.appendChild(cell_population);

                    cell_year.append(year);
                    contents_row.appendChild(cell_year);

                    cell_button.append(edit);
                    cell_button.append(delet);
                    contents_row.appendChild(cell_button);
                    let status = 0
                    for(let i of $(".table").children()){
                        if (i.id == e.target.Continent.value.replace(" ","_")){
                            status = 1
                            $(i).children()[1].append(contents_row)
                            break;
                        }
                    }
                    if (status == 0){
                        let row = document.createElement("div");
                        row.className = "row"
                        row.id = e.target.Continent.value.replace(" ","_")
                        let cell = document.createElement("div");
                        cell.className = "cell";
                        let text = document.createElement("p");
                        text.textContent = e.target.Continent.value;
                        cell.appendChild(text);
                        row.append(cell)
                        let content =  document.createElement("div");
                        content.className = "content"
                        content.appendChild(contents_row)
                        row.appendChild(content)
                        $(".table").append(row);
                    }
                    if(e.target.Continent.value.includes())
                    e.target.Continent.value = "";
                    e.target.Code.value = "";
                    e.target.name.value = "";
                    e.target.Population.value = "";
                    e.target.IndepYear.value = "";
                }else{
                    $("#result").html("most likely the country code is repeated");
                }
            }
        });
        // =============================ajax для cоздания нового элемента==========================
    });
    // ======================форма для добавления новой страны используая континент и вписаные данные===========================
});

// ===========================функция для создания категорий и по ним всех строк==========================================
function create_categories(){
    $(".categories").html("<p id='all'>All</p>");
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:2, query:{field:"country", where:"", order:"Continent ASC", distinct:"Continent", count:""}},//получение уникальных значений
        dataType: "html",
        success: function (response) {
            let dates = JSON.parse(response);
            categories = dates
            for (let i of dates){
                let category = document.createElement("p");
                category.id = i['Continent'].replace(" ", "_")
                category.textContent =  i['Continent']
                $(".categories").append(category);
                $("#"+i['Continent'].replace(" ", "_")).click(function (e) { 
                    $(".row").remove();
                    get_from_categories(e.target.id.replace("_", " "));
                });
                get_from_categories(i.Continent)
            }
        }
    });
}
// ===========================функция для создания категорий и по ним всех строк==========================================

// =========================создание строки по имени категории===========================================
function get_from_categories(name){
    $(".row").remove();
    let sql = {field:"country", where:"Continent,"+name, order:"", distinct:"", count:""}
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:2,query:sql},
        dataType: "html",
        success: function (response) {
            let dates = JSON.parse(response);
            let row = document.createElement("div");
            row.className = "row"
            row.id = name.replace(" ","_")
            let cell = document.createElement("div");
            cell.className = "cell";
            let text = document.createElement("p");
            text.textContent = name;
            cell.appendChild(text);
            row.append(cell)
            let content =  document.createElement("div");
            content.className = "content"
            for (let j of dates){
                if (j.status == 0){
                    let contents_row = document.createElement("div");
                    contents_row.className = "contents_row";

                    let cell_code = document.createElement("div"); 
                    cell_code.className = "cell";
                    let code = document.createElement("p");
                    code.textContent = j.Code;
                    if (j.Code == null){
                        code.textContent = "NULL";
                    }

                    let cell_name = document.createElement("div"); 
                    cell_name.className = "cell";
                    let name = document.createElement("p");
                    name.textContent = j.Name;
                    if (j.Name == null){
                        name.textContent = "NULL";
                    }

                    let cell_population = document.createElement("div"); 
                    cell_population.className = "cell";
                    let population = document.createElement("p");
                    population.textContent = j.Population;
                    if (j.Population == null){
                        population.textContent = "NULL";
                    }

                    let cell_year = document.createElement("div"); 
                    cell_year.className = "cell";
                    let year = document.createElement("p");
                    year.textContent = j.IndepYear;
                    if (j.IndepYear == null){
                        year.textContent = "NULL";
                    }

                    let cell_button = document.createElement("div");
                    cell_button.className = "cell button";
                    let edit = document.createElement("button");
                    edit.textContent = "Edit";
                    edit.className = "edit"
                    edit.id = j.Code;
                    let delet = document.createElement("button");
                    delet.textContent = "Delete";
                    delet.className = "delet"
                    delet.id = j.Code;
                    cell_code.append(code);
                    contents_row.appendChild(cell_code);

                    cell_name.append(name);
                    contents_row.appendChild(cell_name);

                    cell_population.append(population);
                    contents_row.appendChild(cell_population);

                    cell_year.append(year);
                    contents_row.appendChild(cell_year);

                    cell_button.append(edit);
                    cell_button.append(delet);
                    contents_row.appendChild(cell_button);

                    content.appendChild(contents_row);

                    row.appendChild(content);
                    $(".table").append(row);
                    $("#count").text($('.contents_row').length);
                    edit.addEventListener("click", (e)=>{
                        e.preventDefault()
                        creat_table(e,$ ( "#"+e.target.id ).parentsUntil(stop = ".content" ))
                    });
                    delet.addEventListener("click", (e)=>{
                        e.preventDefault()
                        delete_row(e,e.target.id)
                    });
                    }
                }
        }
    })
}
// =========================создание строки по имени категории===========================================

// ======================создание таблицы для изменения в строке элемента==============================
function creat_table(e, obj){
    let code = obj.children()[2].textContent
    let name = obj.children()[3].textContent
    let population = obj.children()[4].textContent
    let year = obj.children()[5].textContent
    obj.html(`<form class="update_continents" name="Myform" id = '`+e.target.id+`'>
    <div class="row_form">
        <div class="cell">
        <select name="Continent" id="">
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
            <option value="South America">South America</option>
        </select></div>
        <div class="cell"><p>`+code+`</p></div>
        <div class="cell"><input required type="text" placeholder="Country name" name="name" value="`+name+`"></div>
        <div class="cell"><input required type="number" placeholder="Population" name="Population" value="`+population+`"></div>
        <div class="cell"><input required type="number" size="3" placeholder="IndepYear" name="year" value="`+year+`"></div>
        <button>Update</button>
    </div>
    <p class="count">Result: <span id="result">--</span></p>
    </form>`)
    $(".update_continents").submit(function (e) { 
        e.preventDefault();
        let values = {field:"country"}
        values.continent = e.target.Continent.value
        values.name = e.target.name.value
        values.population = e.target.Population.value
        values.year = e.target.year.value
        values.code = e.target.id
        $.ajax({
            type: "post",
            url: "../configs/connect.php",
            data: {status:4,form:values},
            dataType: "html",
            success: function (response) {
                if (response == 1){
                    let contents_row = document.createElement("div");
                    contents_row.className = "contents_row";

                    let cell_code = document.createElement("div"); 
                    cell_code.className = "cell";
                    let code = document.createElement("p");
                    code.textContent = e.target.id;

                    let cell_name = document.createElement("div"); 
                    cell_name.className = "cell";
                    let name = document.createElement("p");
                    name.textContent = e.target.name.value;

                    let cell_population = document.createElement("div"); 
                    cell_population.className = "cell";
                    let population = document.createElement("p");
                    population.textContent = e.target.Population.value;

                    let cell_year = document.createElement("div"); 
                    cell_year.className = "cell";
                    let year = document.createElement("p");
                    year.textContent = e.target.year.value;

                    let cell_button = document.createElement("div");
                    cell_button.className = "cell button";
                    let edit = document.createElement("button");
                    edit.textContent = "Edit";
                    edit.className = "edit"
                    edit.id = e.target.id;
                    let delet = document.createElement("button");
                    delet.textContent = "Delete";
                    delet.className = "delet"
                    delet.id = e.target.id;
                    cell_code.append(code);
                    contents_row.appendChild(cell_code);

                    cell_name.append(name);
                    contents_row.appendChild(cell_name);

                    cell_population.append(population);
                    contents_row.appendChild(cell_population);

                    cell_year.append(year);
                    contents_row.appendChild(cell_year);

                    cell_button.append(edit);
                    cell_button.append(delet);
                    contents_row.appendChild(cell_button);

                    edit.addEventListener("click", (e)=>{
                        e.preventDefault()
                        creat_table(e,$ ( "#"+e.target.id ).parentsUntil(stop = ".content" ))
                    });
                    delet.addEventListener("click", (e)=>{
                        e.preventDefault()
                        delete_row(e,e.target.id)
                    });
                    if(obj.parentsUntil(".table").children(".cell")[0].textContent == e.target.Continent.value){
                        $(contents_row).insertAfter(obj);
                        obj.remove()
                    }else{
                        let status = 0;
                        for(let i of $(".table").children()){
                            if($(i).children().prevObject[0].id != ""){
                                if(e.target.Continent.value.includes($(i).children().prevObject[0].id)){
                                    if($($(obj).parentsUntil(".table")[0]).children().length-1 <= 0){
                                        $(obj).parentsUntil(".table")[1].remove()
                                    }
                                    $($(i).children()[1]).append(contents_row);
                                    obj.remove()
                                    status = 1
                                    break;
                                }
                            }
                        }
                        if (status != 1){
                            let row = document.createElement("div");
                            row.className = "row"
                            row.id = e.target.Continent.value.replace(" ","_")
                            let cell = document.createElement("div");
                            cell.className = "cell";
                            let text = document.createElement("p");
                            text.textContent = e.target.Continent.value;
                            cell.appendChild(text);
                            row.append(cell)
                            let content =  document.createElement("div");
                            content.className = "content"
                            content.appendChild(contents_row)
                            row.appendChild(content)
                            obj.remove()
                            $(".table").append(row);

                        }
                    }
                    
                }else{
                    $("#result").text("not correct dates");
                }
            }
        });
        
    });
}
// ======================создание таблицы для изменения в строке элемента==============================


function delete_row(e,parametre) {
    $.ajax({
        type: "post",
        url: "../configs/connect.php",
        data: {status:5,form:{field:"country",code: parametre}},
        dataType: "html",
        success: function (response) {
            if(response == 1){
                if($($($( "#"+e.target.id ).parentsUntil(stop = ".content" )).parent()[0]).children().length-1<= 0){
                    $($($( "#"+e.target.id ).parentsUntil(stop = ".content" )).parent()[0]).parent().remove()
                }
                
                $( "#"+e.target.id ).parentsUntil(stop = ".content" ).remove()
            }
        }
    });
}