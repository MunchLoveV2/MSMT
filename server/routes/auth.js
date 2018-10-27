var db = require("../models");

module.exports = function(app, passport) {
  // This links to the front page
  app.put("/api/workorderassignments", function(req, res) {
    const workOrderAssignments = req.body;

    db.workOrderAssignments
      .update(
        { UserinfoId: workOrderAssignments.UserinfoId },
        {
          where: {
            WorkorderId: workOrderAssignments.WorkorderId
          }
        }
      )
      .then(function(data) {
        db.Workorders.findOne({
          where: {
            id: workOrderAssignments.WorkorderId
          }
        }).then(function(data) {
          res.json(data);
        });
      });
  });

  app.post("/api/workorderassignments", function(req, res) {
    db.workOrderAssignments.create(req.body).then(function(data) {
      res.send(data);
    });
  });

  app.get("/api/workorderassignments", function(req, res) {
    db.workOrderAssignments.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/workorders", function(req, res) {
    db.Workorders.findAll({
      include: [
        {
          model: db.workOrderAssignments,
          include: [
            {
              model: db.Userinfo
            }
          ]
        }
      ]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/workorders/:id", function(req, res) {
    db.Workorders.update(
      { status: req.body.status },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function(data) {
      res.send(data);
    });
  });

  app.get("/api/workorders/:id", function(req, res) {
    console.log(req.params.id);
    db.Workorders.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.workOrderAssignments
        }
      ]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/users", function(req, res) {
    db.Userinfo.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/usertypes/:userType", function(req, res) {
    db.UserTypes.findOne({
      where: {
        type: req.params.userType
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/signup", function(req, res) {
    passport.authenticate("local-signup", function(err, user, info) {
      userInfo = {
        username: user.username,
        password: user.password,
        email: user.email,
        userType: user.userType,
        message: info,
        id: user.id
      };
      req.logIn(user, function(err) {
        res.json(userInfo);
      });
    })(req, res);
  });

  app.post("/login", function(req, res) {
    passport.authenticate("local-signin", function(err, user, info) {
      userInfo = {
        username: user.username,
        password: user.password,
        email: user.email,
        message: info,
        id: user.id
      };
      req.logIn(user, function(err) {
        res.json(userInfo);
      });
    })(req, res);
  });
};
