const express = require('express');
const { body } = require('express-validator/check')

const prodController = require('../controllers/products')

const router = express.Router();

router.get('/products/:start', prodController.getProducts)

router.post(
    '/addProduct',
    // [
    //     body('ProductName')
    //         .trim()
    //         .isLength({ min: 3 }),
    //     body('productType')
    //         .trim()
    //         .isLength({ min: 4 }),
    //     body('price')
    //         .isNumeric()
    // ],
    prodController.postAddProducts
);

router.delete('/product/:id', prodController.postDelProduct)

router.post(
    '/product/:id',
    // [
    //     body('ProductName')
    //         .trim()
    //         .isLength({ min: 3 }),
    //     body('productType')
    //         .trim()
    //         .isLength({ min: 4 }),
    //     body('price')
    //         .isNumeric()
    // ],
    prodController.posteditproduct
);

router.get('/product/:ProductName', prodController.searchProductdetails)

module.exports = router;