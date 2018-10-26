module.exports = function(sequelize, DataTypes) {
  const userPermissions = sequelize.define("userPermissions", {
    PermissionId: DataTypes.TEXT
  });

  userPermissions.associate = function(models) {
    userPermissions.belongsTo(models.Userinfo, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return userPermissions;
};
