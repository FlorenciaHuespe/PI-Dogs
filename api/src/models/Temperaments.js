const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Temperament",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    }, //no hace falta poner el id, sequelize lo hace automático
    { timestamps: false }
  );
};