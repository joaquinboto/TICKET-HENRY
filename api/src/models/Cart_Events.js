const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define("Cart_Events", {
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
    },
    subtotal: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {timestamps: false})
}