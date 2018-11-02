const express = require("express");

// Password auth stuffs
var passport = require("passport");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;

// websocket stuff
var WSReadyStates = require("./constants/ws-ready-states");
var expressWs = require("express-ws")(app); // Websocket

// Middleware
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "100000mb" }));


// passport password auth stuff
app.use(
  session({
    secret: "goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//might need this code for Amazon S3 (at one point)
/* app.use(
  "/s3",
  require("react-s3-uploader/s3router")({
    bucket: "workorderpictures",
    region: "us-east-1", //optional
    ACL: "private", // this is default
    uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
); */

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

const env = require("dotenv").load();

//Models
const db = require("./server/models");

// routes
const authRoute = require("./server/routes/auth.js")(app, passport);

require("./server/routes/apiRoutes.js")(app, db.Workorders);
require("./server/routes/permissionRoutes.js")(app, db.userPermissions);

//load passport strategies
require("./server/passport.js")(passport, db.Userinfo);

// Websocket
app.ws("/chat", function(ws, req) {
  ws.on("message", function(msg) {
    console.log("backend msg: ", msg);

    expressWs.getWss().clients.forEach(function(client) {
      console.log("# of clients connected", client._socket.server._connections);

      if (client !== ws && client.readyState === WSReadyStates.OPEN) {
        client.send(msg);
        // console.log('msg',msg);
      }
    });
  });
});

//Sync Database
db.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
