module.exports = function(app, userPermissions) {

    app.post("/api/userpermissions", function(req, res) {

        let permissionIdArray = new Array();
        permissionIdArray = req.body.permissions.split(",");

        permissionIdArray.forEach(permission => {
            const userPermissionsData = {
                UserinfoId: req.body.UserinfoId,
                PermissionId: permission
            }

            userPermissions.create(userPermissionsData).then(function(data) {
            });

        })

    });

};