module.exports = function(app, workorders) {
  app.post("/api/workorders", function(req, res) {
    console.log(req.body);
    workorders.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  /* app.get("/api/workorders", function(req, res) {
    console.log("lol");
    workorders.findAll({}).then(function(data) {
      res.json(data);
    });
  }); */
};