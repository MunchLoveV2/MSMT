var db = require("../models");

module.exports = function(app, workorder) {
  app.post("/api/workorders", function(req, res) {
    console.log(req.body);
    workorder.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/workorders", function(req, res) {
    let workOrderAssignments = req.body;
    console.log(workOrderAssignments);

    workOrderAssignments.forEach(workOrderAssignment => {
      workorders
        .update(
          { assignedTo: workOrderAssignment.userId },
          {
            where: {
              id: workOrderAssignment.workOrderId
            }
          }
        )
        .then(function(data) {
          res.send(data);
        });
    });
  });

  /* app.get("/api/workorders", function(req, res) {
    console.log("lol");
    workorders.findAll({}).then(function(data) {
      res.json(data);
    });
  }); */
};
