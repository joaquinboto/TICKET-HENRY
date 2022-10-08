const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('eventsCreated', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    artist: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    place: {
      type: DataTypes.STRING
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    image:{
      type: DataTypes.STRING
    },
    imageId:{
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
    {
      timestamps: false,
      createdAt: false,
      updateAt: false,
    });
};