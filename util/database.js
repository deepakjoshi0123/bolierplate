const Sequelize = require('sequelize');

const sequelize = new Sequelize('boilerplate', 'root', 'netzwelt', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

// const sequelize = new Sequelize('boilerplate', 'root', 'netzwelt', {
//     dialect: 'process.env.DATABASE',
//     host: 'process.env.HOST',
//     port: 3306
// });
module.exports = sequelize;

//process.env.SCHEMA, process.env.USERNAME, process.env.PASSWORD