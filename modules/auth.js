let Bluebird = require("bluebird");
var uniqid = require("uniqid");
let moment = require("moment");
let async = require("async");
var bcrypt   = Bluebird.promisifyAll(require("bcrypt-nodejs"));
const {ObjectId} = require('mongodb');


// models
let User = require("../models/basicProfile.model");

exports.signup = function(signUpBody){

    return new Promise(async (resolve, reject) => {
        try{
            // generate username strung
            let username = signUpBody.firstName + signUpBody.lastName + "-" + uniqid();
            // mongoose query check for an existing email
            let existingEmails = await User.findOne({email: signUpBody.email});

            if(existingEmails) {
                resolve({
                    success: false,
                    message: "Email exists."
                });
                return;
            }

            // generate password hash
            let salt = await bcrypt.genSaltAsync(10);
            let hashPassword = await bcrypt.hashAsync(signUpBody.password, salt, null);

            console.log
            let user = new User({
                username: username,
                firstName: signUpBody.firstName,
                lastName: signUpBody.lastName,
                email: signUpBody.email,
                password: hashPassword,
                lastLoggedIn: moment().valueOf(),
                createdAt: moment().valueOf()
            });

            // mongoose save query
            user.save(function(err, data) {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                resolve({
                    success: true,
                    message: "User registered successfully."
                })
            })
            return;

        }
        catch(error){
            console.log(error);
            reject(error);
        }
    })
}

exports.login = async function(logInBody){
    return new Promise(async (resolve, reject) => {
        try{
            let result = await User.findOne({email: logInBody.email});
    
            console.log("DB query response ==> ", result);
            if(!result) {
                resolve({
                    success: false,
                    message: "Email not found."
                });
                return;
            }

            let matched = await bcrypt.compareAsync(logInBody.password, result.password);
            if(matched) {
                resolve({
                    success: true,
                    message: "LoggedIn successfully"
                });
                return;
            }
    
            resolve({
                success: false,
                message: "Failed to login."
            });
            return;
    
        }
        catch(error){
            console.log(error);
            reject(error);
        }
    })
}