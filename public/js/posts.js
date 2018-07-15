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
        var thisId = $(this).data("id");
        $.ajax({
            method: "GET",
            url: "/note/" + thisId
        })
        .then(function(data) {
            if (data.note === undefined) {
                $("#title").val("");
                $("#body").val("");
                $("#submitNote").data("postId", thisId);
                $("#createNote").modal("show");
            } else {
                $.ajax({
                    method: "GET",
                    url: "/note/" + thisId
                })
                .then(function(data) {
                    if (data.note) {
                        $("#vtitle").val(data.note.title);
                        $("#vbody").val(data.note.body);
                        $("#updateNote").data("updateId", data.note._id);
                        $("#viewNote").modal("show");
                    }
                });

            }
        });
    });

    $("#submitNote").on("click", function(event){

        event.preventDefault();

        var title = $("#title").val();
        var body = $("#body").val();
        var thisId = $("#submitNote").data("postId");

        $.ajax({
            method: "POST",
            url: "/note/" + thisId,
            data: {
              title: title,
              body: body
            }
          })
            .then(function(data) {
              console.log(data);
              $("#createNote").modal("hide");
            });
    })

    $("#updateNote").on("click", function(event){

        event.preventDefault();

        var title = $("#vtitle").val();
        var body = $("#vbody").val();
        var thisId = $("#updateNote").data("updateId");

        $.ajax({
            method: "POST",
            url: "/noteupdate/" + thisId,
            data: {
              title: title,
              body: body
            }
        })
        .then(function(data) {
            console.log(data);
            $("#viewNote").modal("hide");
        });
    })

})