module.exports = function(sequelize, DataTypes) {
    var Workorders = sequelize.define("Workorders", {
      title: DataTypes.TEXT,
      category: DataTypes.TEXT,
      location: DataTypes.TEXT,
      workOrderImage: DataTypes.BLOB
    });
   

    Workorders.associate = function(models) {


      Workorders.belongsTo(models.Userinfo, {
        foreignKey: {
            allowNull: false
        }
      });
  };
  return Workorders;
};