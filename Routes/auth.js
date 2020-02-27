const express = require('express');
const { body } = require('express-validator');
const authControl = require('../controllers/users')
const router = express.Router();

const user = require('../model/user');

router.post(
    '/signup',
    // [
    //     body('email')
    //         .isEmail()
    //         .withMessage('please enter a valid email ')
    //         .custom((value, { req }) => {
    //             return user.findAll({ where: { email: value } }).then(userDoc => {
    //                 if (!userDoc) {
    //                     return Promise.reject('E-MAIL ALREADY EXISTS')
    //                 }
    //             });
    //         })
    //         .normalizeEmail(),
    //     body('password')
    //         .trim()
    //         .isLength({ min: 5 }),
    //     body('name')
    //         .trim()
    //         .not()
    //         .isEmpty()
    // ],
    authControl.signup
);
router.post('/login', authControl.login);

router.post('/profile', authControl.getProfile);

module.exports = router;
