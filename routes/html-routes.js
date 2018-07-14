module.exports = function(app) {

    app.get("/", function(req, res) {
      res.render("home");
    });
  
    app.get("/posts", function(req, res) { 
      res.render("posts");
    });
  
};