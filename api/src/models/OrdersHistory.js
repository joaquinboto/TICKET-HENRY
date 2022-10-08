const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('ordersHistory', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detail: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    })
}