const express = require('express');
const { body } = require('express-validator/check')

const prodController = require('../controllers/products')

const router = express.Router();

router.get('/products', prodController.getProducts)

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

router.delete('/product/:productId', prodController.postDelProduct)

router.post(
    '/product/:productId',
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

router.post('/product/:productName', prodController.searchProductdetails)

module.exports = router;