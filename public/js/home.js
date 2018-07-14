function getUrl(btn) {
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
    });
    
    field.val("");   
}

$(document).ready(function () {

    $("#jumbo").on("click", function(event) {
        event.preventDefault();
        var btn = $(this).attr("id");
        getUrl(btn);
    });

    $("#nav").on("click", function(event) {
        event.preventDefault();
        var btn = $(this).attr("id");
        getUrl(btn);
    });

})