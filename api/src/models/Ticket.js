const {DataTypes} = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('ticket', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}