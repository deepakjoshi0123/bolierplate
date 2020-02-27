const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./Routes/auth')
const userRoutes = require('./Routes/products')
const User = require("./model/user");
const Products = require("./model/products");
const sequelize = require('./util/database');
const app = express()

app.use(bodyParser.json());

app.use('/', authRoutes);
app.use('/users', userRoutes);

//global error handler 
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

sequelize.sync().then(res => {
    // console.log(res)
}).catch(err => {
    console.log(err);
});

console.log('connected')
app.listen(8080);