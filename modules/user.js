let UserModel = require("../models/user.model");
let uniqid = require("uniqid");
let moment = require("moment");
let utilsModule = require("./utils.js");
var bcrypt = require('bcrypt-nodejs');


exports.sendResetPassLink = function(email) {
    return new Promise((resolve, reject) => {
        try {

            let token = uniqid() + uniqid();
            let token_timestamp = moment().add(2, "hours").valueOf();
            
            // get user with given emailid
            let user = await User.find({email: email});

            if (user != null && user.length > 0) {

                // update token
                UserModel.findByIdAndUpdate({_id: user._id}, {token: token, token_timestamp: token_timestamp});

                let mailData = {
                    token: token,
                    domain: domain,
                    email: email
                }

                // sendResetPassLink
                await utilsModule.sendMail([user.email], mailData, "reset_pass_link.ejs", "Password reset link.");
                resolve({
                    success: true
                })
                
                
            } else {
                resolve({
                    success: false,
                    message: "No user exists."
                })
            }
        } catch(error) {
            reject(error);
        }
    })
}

exports.updateForgotPassword = function(token, password) {
    return new Promise((resolve, reject) => {
        try {
            let currentTime = moment().valueOf();



            let user = await UserModel.find({token: token})
            // if user token timestamp is greater than current timestamp then send reset link else reject request
            if (currentTime < user.token_timestamp || user.token_timestamp == null) {


                // generate hashed password
                let hashPassowrd = await new Promise((resolve, reject) => {
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) reject(err);
                        bcrypt.hash(password, salt, null, function (err, hash) {
                            if (err) reject(err);
                            resolve(hash);
                        });
                    });
                })

                // update user password
                UserModel.findByIdAndUpdate({_id: user._id}, {password: hashPassowrd, token: null, token_timestamp: null});
                resolve({
                    success: true
                })
            } else {
                resolve({
                    success: false,
                    message: "Token is expired"
                })
            }

        } catch(error) {
            reject(error);
        }
    })
}