var dates = "";
var changed_dates = ""
var use_dates = []
$(document).ready(function () {
    $.ajax({
        type: "post",
        url: "pizza_out.php",
        data: {"status":1},
        dataType: "html",
        success: function (data) {
            dates = JSON.parse(data);
            changed_dates = JSON.parse(data);
            let text = "<option selected value = '0'>Please select pizza</option>";
            for(i of dates){
                text += "<option value = '"+i.anchor+"'>";
                text += i.name + " " + i.prise+"€";
                text += "</option>"
            }
            $("#kind").html(text);
        }
    });
    
    $("#add").click(function (e) { 
        e.preventDefault();
        var data_select = $("#kind").val();
        for(i of dates){
            if (data_select == 0){
                break;
            }else{
                if (i.anchor == data_select){
                    // changed_dates.splice(number-1,1)
                    var number = 0;
                    let text = "<option selected value = '0'>Please select pizza</option>";
                    for(j of changed_dates){
                        if (j.anchor == i.anchor){
                            let div = document.createElement("div");
                            div.className = "order";
                            div.id = "order_"+changed_dates[number].anchor;
                            let in_div = document.createElement("div");
                            in_div.className = "order_header"
                            let crest = document.createElement("img");
                            crest.src = "crest.png";
                            crest.id = changed_dates[number].anchor;
                            let name_order = document.createElement("input");
                            name_order.setAttribute("readonly","");
                            name_order.value = changed_dates[number].name;
                            name_order.name = "name_"+changed_dates[number].anchor;
                            name_order.id = "text";
                            let peremichka = document.createElement("p");
                            peremichka.textContent = "-"
                            let count = document.createElement("input");
                            count.name = "count_"+changed_dates[number].anchor;
                            count.type = "number"
                            count.min = 1;
                            count.id = "id_"+changed_dates[number].anchor;
                            count.setAttribute("required","")
                            count.value = 0;
                            count.placeholder = "Pizza count"
                            let message = document.createElement("textarea");
                            message.name = "message_"+changed_dates[number].anchor;
                            message.placeholder = "your wishes";
                            in_div.appendChild(name_order);
                            in_div.appendChild(peremichka);
                            in_div.appendChild(count);
                            in_div.appendChild(crest)
                            div.appendChild(in_div);
                            div.appendChild(message);
                            document.getElementById("get_select").appendChild(div);
                            $("#id_"+changed_dates[number].anchor).on('input', function (e) {
                                e.preventDefault();
                                summa()
                                if ($("#"+e.target.id).val() < 0){
                                    $("#"+e.target.id).val(0)
                                }
                            });
                            $("#"+changed_dates[number].anchor).click(function (e) {
                                $("#order_"+e.target.id).remove();
                                $("#summa").text(0);
                                let number = 0;
                                for(w of use_dates){
                                    if(w.anchor == e.target.id){
                                        changed_dates.push(use_dates.splice(number,1)[0])
                                    }
                                    number ++;
                                }
                                let text = "<option selected value = '0'>Please select pizza</option>";
                                changed_dates.forEach(element => {
                                    text += "<option value = '"+element.anchor+"'>";
                                    text += element.name + " " + element.prise+"€";
                                    text += "</option>"
                                });
                                $("#kind").html(text);
                            });
                            use_dates.push(changed_dates.splice(number,1)[0]);
                        }
                        number ++;
                    }
                    changed_dates.forEach(element => {
                        text += "<option value = '"+element.anchor+"'>";
                        text += element.name + " " + element.prise+"€";
                        text += "</option>"
                    });
                    $("#kind").html(text);
                    break;
                }
            }
        }
    });
    $("#myForm").submit(function (e) { 
        e.preventDefault();
        $("#wait").text("wait please, we send your order");
        if(dates.length != changed_dates.length){
            let form = new FormData(document.getElementById("myForm"))
            let import_dates = {};
            import_dates.name = form.get("name");
            import_dates.adress = form.get("adress");
            import_dates.phone = form.get("phone");
            import_dates.email = form.get("email");
            import_dates.orders = [];
            import_dates.summa = $("#summa").text();
            use_dates.forEach(element => {
                if(form.get("name_"+element.anchor) != null){
                    let order = {};
                    order.name = form.get("name_"+element.anchor);
                    order.count = form.get("count_"+element.anchor);
                    order.message = form.get("message_"+element.anchor);
                    import_dates.orders.push(order)
                }
            });

            $.ajax({
                type: "post",
                url: "form.php",
                data: import_dates,
                dataType: "html",
                success: function (response) {
                    let answer = JSON.parse(response)
                    console.log(answer)
                    if (answer[0] == 1){
                        $("#wait").text("Succsesful!!!");
                    }
                    let result_text = "<div>";
                    result_text += "<h2>Name: "+answer[1].name+"</h2>";
                    result_text += "<h3>Adress: "+answer[1].adress+"</h3>";
                    result_text += "<h3>Phone: "+answer[1].phone+"</h3>";
                    result_text += "<h3>Email: "+answer[1].email+"</h3>";
                    result_text += "</div>"
                    result_text += "<div class='orders'>";
                    answer[1].orders.forEach(element => {
                        result_text += "<div>";
                        result_text += "<h4>Pizza name: "+element.name+"</h4>";
                        result_text += "<h4>Pizza count: "+element.count+"</h4>";
                        result_text += "<h4>Pizza wishes: "+element.message+"</h4>";
                        result_text += "</div>";
                    });
                    result_text += "</div>";
                    result_text += "<div><p>Summa: "+answer[1].summa+"</p><p>Заказ прибудет через полтора часа</p></div>"
                    $("#result").html(result_text);
                }
            });
        }
        
    });
});

function summa(){
    let summa = 0;
    use_dates.forEach(element => {
        summa += $("#id_"+element.anchor).val()*element.prise;
    });
    summa = summa.toFixed(2);
    $("#summa").text(summa);
}