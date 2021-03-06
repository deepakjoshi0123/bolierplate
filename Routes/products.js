const express = require('express');
const { body } = require('express-validator/check')
const productController = require('../controllers/products')

const router = express.Router();

router.get('/products/:start', productController.getProducts)

router.post(
    '/addProduct',
    [
        body('ProductName')
            .trim()
            .isLength({ min: 3 }),
        body('productType')
            .trim()
            .isLength({ min: 4 }),
        body('price')
            .isNumeric()
    ],
    productController.postAddProducts
);

router.delete('/product/:id', productController.postDelProduct)

router.post(
    '/product/:id',
    [
        body('ProductName')
            .trim()
            .isLength({ min: 3 }),
        body('productType')
            .trim()
            .isLength({ min: 4 }),
        body('price')
            .isNumeric()
    ],
    productController.posteditproduct
);

router.get('/product/:ProductName', productController.searchProductdetails)

module.exports = router;