const user = require('../model/users');

exports.postAddUsers = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    const country = req.body.country;
    const fullName = req.body.fullname;

    user.create({
        email: email,
        password: password,
        country: country,
        fullName: fullName
    }).then(result => {
        console.log('usr added');
    }).catch(er => {
        console.log(err);
    });
}
exports.searchUserdetails = (req, res, next) => {
    const fullName = req.body.fullName;
    user.findAll({ where: { fullName: fullName } }).then(result => {
        res.json({ user: result })
    }).catch(err => {
        console.log(err);
    })
}