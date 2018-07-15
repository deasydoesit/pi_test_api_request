//dependencies
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var db = require("../models");

//set-up mongo
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoReddit";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = function(app) {

    app.get("/", function(req, res) {

        db.Post.find({})
        .then(function(dbPost) {
            res.render("home", {"posts": dbPost});
        })
        .catch(function(err) {
          res.json(err);
        });

    });
    
    app.get("/posts", function(req, res) { 

        db.Post.find({"saved": true})
        .then(function(dbSaved) {
            res.render("posts", {"saved": dbSaved});
        })
        .catch(function(err) {
          res.json(err);
        });
    
    });

    app.post("/api/scrape", function(req, res) { //scrape data on search request

        axios.get("https://old.reddit.com/" + req.body.url + "/") //axios request based on submitted subreddit
        .then(function(response) {

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
            return returnToClient; //make array available for return to client
        })
        .then(function(returnToClient) {
            return res.json(returnToClient); //return array to client
        })
    });

    app.post("/api/save", function(req, res) {
        console.log(req.body);
        db.Post.findOneAndUpdate(req.body, {$set: {saved: true}})
        .then(function() {
            res.send("Saved");
          })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.delete("/api/delete", function(req, res) {
        console.log(req.body);
        db.Post.remove(req.body)
        .then(function() {
            res.send("Deleted");
          })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.get("/note/:id", function(req, res) {
        db.Post.findById({_id: req.params.id})
            .populate("note")
            .then(function(dbNote) {
                res.json(dbNote);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    app.post("/note/:id", function(req, res) {
        db.Note.create(req.body)
        .then(function(dbNote) {
          return db.Post.findOneAndUpdate( {_id: req.params.id}, {note: dbNote._id}, { new: true });
        })
        .then(function(dbPost) {
          res.json(dbPost);
        })
        .catch(function(err) {
          res.json(err);
        });
    });

    app.post("/noteupdate/:id", function(req, res) {
        console.log(req.body);
        db.Note.findOneAndUpdate( {_id: req.params.id}, {title: req.body.title, body: req.body.body})
        .then(function(dbPost) {
          res.json(dbPost);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
}