const Sequelize = require('sequelize');
const sequelize = require('../util/database')
const product = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    ProductName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    productType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = product;
