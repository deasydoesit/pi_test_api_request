function displayResults(results) {

    if($(".nothing").length) {
        $(".nothing").css("display", "none");
    }
    var container = $("#results");
    var counter = 1;

    results.forEach( function(element) { 
        var row = $("<div>").addClass("row res-item");
        
        var colContent = $("<div>").addClass("col-sm-8").text(element.title);
        var colBtns = $("<div>").addClass("col-sm-4");
        var link = $("<a>").attr("href", element.link).attr("target", "_blank").addClass("btn btn-primary").text("Link");
        var save = $("<button>").addClass("btn btn-primary give-space").data("title", element.title).text("Save!");

        colBtns.append(link).append(save);
        row.append(colContent).append(colBtns);
        container.prepend(row);

        counter++;
    });
}

$(document).ready(function () {

    

})