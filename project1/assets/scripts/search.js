$(document).ready(function () {
    
    $('#search').on('input', function(e) {
        for(let i of $(".table").children()){
            if(i.id != "row_header"){
                if($(i).children().length > 2){
                    if($(i).children()[0].textContent.includes(e.target.value) || $(i).children()[1].textContent.includes(e.target.value)){
                        $(i).show(100);
                    }else{
                        $(i).hide(100);
                    }
                }else{
                    for(let j of $($(i).children()[1]).children()){
                        if($(j).children()[0].textContent.includes(e.target.value) || $(j).children()[1].textContent.includes(e.target.value)){
                            $(j).show(100);
                        }else{
                            $(j).hide(100);
                        }
                    }
                }
            }
        }
    });
    
});
