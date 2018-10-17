var authController = require("../controllers/authcontroller.js");
var db = require("../models");

module.exports = function(app, passport) {
  // This links to the front page
  app.get("/frontpage", authController.frontpage);
  app.get("/", authController.front);
  app.get("/login", checkLogIn, authController.login);
  app.get("/signup", authController.signup);
  app.get("/aboutus", authController.aboutus);

  app.get("/search/:location", authController.searchresults);

  app.get("/api/workorders", function(req, res) {
    db.Workorders.findAll({}).then(function(data) {
      res.json(data);
    });
});

  app.post('/signup', function(req, res) {
    passport.authenticate("local-signup", function(err, user, info) {
      userInfo = {
        username: user.username,
        password: user.password,
        email: user.email,
        message: info,
        id: user.id
      }
      req.logIn(user, function(err) {
        res.json(userInfo);
      });
        
    }) (req, res);
  });


  app.get("/api/favorites", authController.favorites);

  app.get("/logout", authController.logout);
  app.post('/login', function(req, res) {
    passport.authenticate("local-signin", function(err, user, info) {
      userInfo = {
        username: user.username,
        password: user.password,
        email: user.email,
        message: info,
        id: user.id
      }
      req.logIn(user, function(err) {
        res.json(userInfo);
      });
        
    }) (req, res);
  });


  app.get("*", authController.error);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({username: null});
    }
  }

  function checkLogIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/profile");
    }
  }
};
