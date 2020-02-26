const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

router.put(
    '/signup',
    [
        body('email')
            .isEmail()
            .withMessage('please enter a valid email ')
            .custom
    ]
)
