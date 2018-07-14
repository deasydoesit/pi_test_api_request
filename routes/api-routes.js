var cheerio = require("cheerio");
var request = require("request");

var mongoose = require("mongoose");
var db = require("../models");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoReddit";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = function(app) {

    app.post("/api/scrape", function(req, res) {
        request("https://old.reddit.com/" + req.body.url + "/", function(error, response, html) {

            var $ = cheerio.load(html);
            var results = [];

            $("p.title").each(function(i, element) {
                
                var title = $(element).text();
                var link = $(element).children().attr("href");

                results.push({
                    title: title,
                    link: link
                });
                // if (title && link) {
                //     db.Post.insert({
                //         title: title,
                //         link: link
                //     },
                //     function(err, inserted) {
                //     if (err) {
                //         console.log(err);
                //     }
                //     else {
                //         console.log(inserted);
                //     }
                //     });
                // }
            });
            console.log(results);
        });
    });

}