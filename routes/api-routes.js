var cheerio = require("cheerio");
var axios = require("axios");

var mongoose = require("mongoose");
var db = require("../models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoReddit";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = function(app) {

    app.post("/api/scrape", function(req, res) {

        axios.get("https://old.reddit.com/" + req.body.url + "/")
        .then(function(response) {

            var $ = cheerio.load(response.data);
            var returnToClient = []

            $("p.title").each(function(i, element) {
                
                var result = {};
                result.title = $(element).text();

                var link = $(element).children().attr("href");

                console.log(link);
                
                if (link === undefined) {
                    return 
                } else if (link[0] === "h") {
                    result.link = link
                } else {
                    result.link = "https://reddit.com" + link
                }

                returnToClient.push(result);

                if (result.title && result.link) {
                    db.Post.create(result)
                    .then(function(dbPost) {
                        console.log(dbPost);
                    })
                    .catch(function(err) {
                        return res.json(err);
                    });
                }
            });
            return returnToClient;
        })
        .then(function(returnToClient) {
            console.log(returnToClient);
            return res.json(returnToClient);
        })
    });




}