//import "constant"
const { validationResult } = require('express-validator/check')
const user = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//sends user profile after matching the email 
exports.getProfile = (req, res, next) => {
    const email = req.body.email;
    console.log(email)
    user.findOne({ where: { email: email } })
        .then(userProfile => {
            res.json({ user: userProfile });
        })
        .catch(err => {
            console.log(err)
        })
}
// handles signup when users creates new profile 
exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    const country = req.body.country;
    const fullName = req.body.fullName;
    let hashPass;

    const errors = validationResult(req);
    let isErr = (password, repeatPassword) => {
        if (password !== repeatPassword)
            return false;
        else true;
    }

    if (!errors.isEmpty()) {
        console.log(errors)
        const error = new Error('validation failedre ');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    bcrypt.hash(password, 12)
        .then(hashedPw => {
            hashPass = hashedPw;
            // slow it will have to wait till we get hassedpassword  --- resolve this 
            user.create({
                email: email,
                password: hashPass, // assign hashpass  it's coming undefined ----?????????????????????
                country: country,
                fullName: fullName
            }).then(result => {
                console.log('usr added');
                res.json({ message: "user added successfully" })
            }).catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        })
}
//handles login and creates token for him 
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    user.findOne({ where: { email: email } })
        .then(users => {
            if (!users) {
                const error = new Error('A user with this email not found')
                error.statusCode = 401;
                throw error;
            }
            else {
                loadedUser = users;
                return bcrypt.compare(password, users.password);
            }
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('wrong password');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser.id
                },
                'hellow_WorldThere',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser.id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


