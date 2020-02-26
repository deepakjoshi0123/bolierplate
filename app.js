const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./Routes/auth')
const userRoutes = require('./Routes/users')

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
sequelize.sync().then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})
app.listen(8080);
