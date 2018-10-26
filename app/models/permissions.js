module.exports = function(sequelize, DataTypes) {
  const Permissions = sequelize.define("Permissions", {
    permission: DataTypes.TEXT
  });

  return Permissions;
};
