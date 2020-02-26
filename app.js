const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./Routes/auth')
const userRoutes = require('./Routes/users')
const User = require("./model/user");
const Products = require("./model/products");
const sequelize = require('./util/database');
const app = express()

app.use(bodyParser.json());

// app.use('/auth', authRoutes);
// app.use('/users', userRoutes);

//global error handler 
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})
async function test() {

    try {
        // await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        let data = await sequelize.sync({ force: true });
        console.log("All models were synchronized successfully.", data);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

test();
// console.log(result);
console.log('connected')
app.listen(8080);
