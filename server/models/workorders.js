module.exports = function(sequelize, DataTypes) {
  var Workorders = sequelize.define("Workorders", {
    title: DataTypes.TEXT,
    category: DataTypes.TEXT,
    location: DataTypes.TEXT,
    status: DataTypes.TEXT,
    pictureData: DataTypes.BLOB
  });

  Workorders.associate = function(models) {
    Workorders.belongsTo(models.Userinfo, {
      foreignKey: {
        allowNull: false
      }
    });

    Workorders.hasOne(models.workOrderAssignments, {
      onDelete: "cascade"
    });
  };
  return Workorders;
};
