$(document).ready(function () {

    $(".delete").on("click", function() {
        var tbr = $(this);
        var del = tbr.data();
        $.ajax({
            method: "DELETE",
            url: "/api/delete",
            data: del
          })
        .then(function(data) {
            $("#modal-delete").text("");
            $("#modal-delete").text(`Your post has been ${data}!`)
            $("#delete").modal("show");

            $(tbr).parent().parent().css("display", "none");
        });
    });

    $(".note").on("click", function() {

    });

})