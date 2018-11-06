module.exports = function(app, workorders) {
  app.get("/", function(req, res) {
    res.sendFile(
      path.join(__dirname, "../", "../", "client", "public", "index.html")
    );
  });
  app.post("/api/workorders", function(req, res) {
    workorders
      .create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json({ err: "danger will robinson" });
      });
  });
};
