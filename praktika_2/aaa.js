$(document).ready(function () {
    $("#form").on('submit', function (e){
        e.preventDefault();
        $.ajax({
            url: 'index.php',
            type: 'post',
            dataType: 'html',
            data: $(this).serialize(),
            success: function(data){
              $('#msg').html(data);
            }
        });
    })
});
