// import express from 'express'
// import bodyParser from 'body-parser'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const authRoutes = require('./Routes/auth')
const userRoutes = require('./Routes/products')
const User = require("./model/user");
const Products = require("./model/products");
const sequelize = require('./util/database');
const app = express();


// // import { LocaleService } from './internationalCalls/localeService.js';
// // import i18n from './internationalCalls/Config.js';

// const localeService = new LocaleService(i18n);
// console.log(localeService.getLocales()); // ['en', 'el']
// console.log(localeService.getCurrentLocale()); // 'en'
// console.log(localeService.translate('Hello')); //  'Hello'
// console.log(localeService.translatePlurals('You have %s message', 3));

app.use(bodyParser.json());

app.use(morgan('combined'));

app.use('/', authRoutes);
app.use('/prod', userRoutes);

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
