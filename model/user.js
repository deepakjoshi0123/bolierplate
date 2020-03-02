const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false
    },

});

module.exports = user;
