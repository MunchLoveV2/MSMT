module.exports = function(sequelize, DataTypes) {
  const userTypes = sequelize.define("UserTypes", {
    type: DataTypes.TEXT,
    PermissionId: DataTypes.TEXT
  });

  return userTypes;
};
