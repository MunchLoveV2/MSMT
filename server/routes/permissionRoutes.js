var db = require("../models");

module.exports = function(app, userPermissions, userTypes) {
  app.get("/api/usertypes"), function(req, res) {};
  app.post("/api/userpermissions", function(req, res) {
    let permissionIdArray = new Array();
    permissionIdArray = req.body.PermissionId.split(",");

    permissionIdArray.forEach(PermissionId => {
      const userPermissionsData = {
        UserinfoId: req.body.UserinfoId,
        PermissionId: PermissionId
      };

      userPermissions.create(userPermissionsData).then(function(data) {
        console.log(data);
      });
    });
  });
};
