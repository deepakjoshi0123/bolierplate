//import "constant"
const { validationResult } = require('express-validator/check')
const user = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../logger')
const myconst = require('../constant/constant')
//sends user profile after matching the email 

class userController {
    static getProfile = async (req, res, next) => {
        const email = req.body.email;
        try {
            const user1 = await user.findOne({ where: { email: email } })
            if (user1) {
                res.json({ user: userProfile });
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    // handles signup when users creates new profile 
    static signup = async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const country = req.body.country;
        const fullName = req.body.fullName;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            logger.error(myconst.error);
            const error = new Error(myconst.error);
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

        try {
            const hassedPw = await bcrypt.hash(password, 12);
            logger.info('going to insert user in the database');
            const user1 = await user.create({
                email: email,
                password: hassedPw,
                country: country,
                fullName: fullName
            })
            if (user1) {
                logger.info('user inserted successfully')
                res.json({ message: "user added successfully" })
            }
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 422;
            }
            next(error);
        }
    }
    //handles login and creates token for upcoming user
    static login = async (req, res, next) => {

        const email = req.body.email;
        const password = req.body.password;
        let loadedUser;
        logger.info('entry to login function ')
        try {
            const user1 = await user.findOne({ where: { email: email } });

            if (!user1) {
                const error = new Error('A user with this email not found');
                logger.error('User with this email not found');
                error.statusCode = 401;
                throw error;
            }
            const isEqual = await bcrypt.compare(password, user1.password);
            if (!isEqual) {
                const error = new Error('wrong password');
                logger.error('WRONG PASSWORD INSERTED');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: user1.email,
                    userId: user1.id
                },
                'hellow_WorldThere',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: user1.id });
            logger.info('token and id send as response');
        }
        catch (error) {
            console.log(error);
            next(error);
        }

    };
}
module.exports = userController;

