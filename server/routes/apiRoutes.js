module.exports = function(app, workorders) {
  app.get("/", function(req, res) {
    res.sendFile(
      path.join(__dirname, "../", "../", "client", "public", "index.html")
    );
  });
  app.post("/api/workorders", function(req, res) {
    workorders
      .create(req.body)
      .then(function(data, a2, a3) {
        console.log(data);
        console.log(a2);
        console.log(a3);
        res.json(data);
      })
      .catch(function(err, e2, e3) {
        console.log(err.message);
        console.log(e2);
        console.log(e3);
        console.log("hi");
        res.json({ err: "danger will robinson" });
      });
  });
};
