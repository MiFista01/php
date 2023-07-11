$(document).ready(function () {
    $(".user_form").submit(function (e) { 
        let values = new Map();
        for(let i of e.target){
            if(i.name != ""){
                values.set(i.name,i.value)
            }
        }
        $.ajax({
            type: "post",
            url: "../configs/connect.php",
            data: {status:1, dates: Object.fromEntries(values)},//получение уникальных значений
            dataType: "html",
            success: function (response) {
                if(response != "false"){
                    let result = `<div class='user'>
                    <img src='../assets/imgs/user.png'>
                    <p>`+response+`</p>
                    <form class="logOut">
                        <button>logOut</button>
                    </form>
                    </div>`
                    $(result).insertAfter(".user_form");
                    $(".user_form").remove();
                    $(".logOut").submit(function (e) { 
                        e.preventDefault();
                        console.log(e)
                    });
                }
            }
        });
    });
});