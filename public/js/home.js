function displayResults(results) {

    if ($(".nothing").length) {
        $(".nothing").css("display", "none");
    }

    var container = $("#results");
    var mediary = $("<div>");

    results.forEach( function(element) { 
        var row = $("<div>").addClass("row res-item");
        
        var colContent = $("<div>").addClass("col-sm-8").text(element.title);
        var colBtns = $("<div>").addClass("col-sm-4");
        var link = $("<a>").attr("href", element.link).attr("target", "_blank").addClass("btn btn-primary").text("Link");
        var save = $("<button>").addClass("btn btn-primary give-space").data("title", element.title).text("Save!");

        colBtns.append(link).append(save);
        row.append(colContent).append(colBtns);
        mediary.append(row)
        container.prepend(mediary);
    });
}

function getUrl(btn) { // submit post request incorporating user search
    var field = $(`#${btn}Search`);
    var url = field.val();
    
    $.ajax({
        method: "POST",
        url: "/api/scrape",
        data: {
          url: url
        }
      })
    .then(function(data) {
        console.log(data);
        displayResults(data);
        $("#modal-para").text("");
        $("#modal-para").text(`Scraped ${data.length} posts!`)
        $("#modal").modal("show");
    });
    
    field.val("");   
}

$(document).ready(function () {

    $("#jumbo").on("click", function(event) {
        event.preventDefault();
        var btn = $(this).attr("id");
        getUrl(btn);
    });

    $("#results").on("click", ".give-space", function() {
        var save = $(this).data();
        $.ajax({
            method: "POST",
            url: "/api/save",
            data: save
          })
        .then(function(data) {
            $("#modal-save").text("");
            $("#modal-save").text(`Your post has been ${data}!`)
            $("#saved").modal("show");
        });
    })

})