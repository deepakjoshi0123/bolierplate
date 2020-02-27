const {validationResult} = require('express-validator/check')
const user = require('../model/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    const country = req.body.country;
    const fullName = req.body.fullname;
    let hashPass;

    const errors = validationResult(req);
     let isErr = (password,repeatPassword)=>{
        if(password!==repeatPassword)
         return false;
        else true ;
    }
    
    if(!errors.isEmpty()) {
        const error = new Error('validation failed ');
        error.statusCode = 422 ; 
        error.data = errors.array();
        throw error;
    }

    bcrypt
       .hash(password,12)
       .then(hashedPw =>{
          hashPass=hasedPw;
           })
        .catch(err=>{
            console.log(err);
        })   
    user.create({
        email: email,
        password: hashPass,
        country: country,
        fullName: fullName
    }).then(result => {
        console.log('usr added');
    }).catch(er => {
        console.log(err);
    });
}

exports.login = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    user.findAll({where : {email:email}})
    .then(user=>{
        if(!user){
          const error = new Error('A user with this email not found')
          error.statusCode = 401;
          throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual =>{
        if(!isEqual){
            const error =new Error('wrong password');
            error.statusCode = 401 ;
            throw error;
        }
      const token =jwt.sign(
          {
              email : loadedUser.email,
              userId : loadedUser._id.toString()
          },
          'hellow_WorldThere',
          {expiresIn : '1h'}
      ); 
      res.status(200).json({token : token , userId :loadedUser._id.toString() }) ;
    })
    .catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500 ;
        }
        next(err);
    });
};