//dependencies
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.render("home");
    });
    
    app.get("/posts", function(req, res) { 
        res.render("posts");
    });

    app.post("/api/scrape", function(req, res) { //scrape data on search request

        axios.get("https://old.reddit.com/" + req.body.url + "/") //axios request based on submitted subreddit
        .then(function(response) {
            console.log(response);
            var returnToClient = [] //this array will ultimately copy the scraped data for return to client

            var $ = cheerio.load(response.data);

            $("p.title").each(function(i, element) {
                
                var result = {};
                result.title = $(element).text();

                var link = $(element).children().attr("href");
                
                if (link === undefined) {  //prep links 
                    return 
                } else if (link[0] === "h") {
                    result.link = link
                } else {
                    result.link = "https://reddit.com" + link
                }

                returnToClient.push(result); //push scraped data into array

            });
            return returnToClient; //make array available for return to client
        })
        .then(function(returnToClient) {
            return res.json(returnToClient); //return array to client
        })
    });

    app.post("/api/save", function(req, res) {
        console.log(req.body);
    });

    app.delete("/api/delete", function(req, res) {
        console.log(req.body);
    });

    app.get("/note/:id", function(req, res) {
        console.log(req.params.id);
    });

    app.post("/note/:id", function(req, res) {
        console.log(req.params.id);
    });

    app.post("/noteupdate/:id", function(req, res) {
        console.log(req.body);
    });
}