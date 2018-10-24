module.exports = function(app, workorders) {
  app.post("/api/workorders", function(req, res) {
    console.log(req.body);
    workorders.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  app.put("/api/workorders", function(req, res) {
    workOrderAssignments = req.body;

    let assignmentsArray = workOrderAssignments.forEach(workOrderAssignment => {
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
