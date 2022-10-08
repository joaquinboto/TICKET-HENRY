const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('event', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        },
      description: {
        type: DataTypes.STRING
      },
      price: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      date: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      artist: { 
          type: DataTypes.ARRAY(DataTypes.STRING),
      },
      place: {
          type: DataTypes.STRING
      },
      currentStock: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      stock:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category: {
          type: DataTypes.ARRAY(DataTypes.STRING)
      },
      image: {
        type: DataTypes.STRING
      },
      imageId:{
        type: DataTypes.STRING
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
  })
}