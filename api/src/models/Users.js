const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('users', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'El email tiene que ser un email valido'
          }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
      type: DataTypes.ENUM(['Admin', 'User', 'Banned']),
      defaultValue: 'User',
    },
    profile_picture: {
      type: DataTypes.TEXT
    },
    profile_picture_id: {
      type: DataTypes.TEXT
    },
    favorites: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    },
  {
    timestamps: false,
    createdAt: false,
    updateAt: false,
  });
};