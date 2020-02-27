const express = require('express');
const {body} = require('express-validator/check')
const product = require('');

const prodController =require('../controllers/products')
const product = require('../model/products');


const router = express.Router();

router.get('/products',prodController.getProducts)
