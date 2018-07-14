var express = require("express"); 
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");

var request = require("request");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;
var db = require("./models");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoReddit";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});