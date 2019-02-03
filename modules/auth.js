let Bluebird = require("bluebird");
let uniqid = require("uniqid");
let moment = require("moment");
let async = require("async");
let bcrypt   = Bluebird.promisifyAll(require("bcrypt-nodejs"));
const {ObjectId} = require('mongodb');
let jwt = require('jsonwebtoken'); 

// models
let User = require("../models/basicProfile.model");

exports.signup = function(signUpBody){

    return new Promise(async (resolve, reject) => {
        try{
            // generate username strung
            let username = signUpBody.firstName + signUpBody.lastName + "-" + uniqid();
            // mongoose query check for an existing email
            let emailExists = await User.findOne({email: signUpBody.email});

            if(emailExists) {
                resolve({
                    success: false,
                    message: "Email exists."
                });
                return;
            }

            // generate password hash
            let salt = await bcrypt.genSaltAsync(10);
            let hashPassword = await bcrypt.hashAsync(signUpBody.password, salt, null);

            //console.log
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

exports.login = async function(logInBody, app){
    return new Promise(async (resolve, reject) => {
        try{
            let result = await User.findOne({email: logInBody.email});
    
            //console.log("DB query response ==> ", result);
            if(!result) {
                resolve({
                    success: false,
                    message: "Email not found."
                });
                return;
            }

            let matched = await bcrypt.compareAsync(logInBody.password, result.password);
            if(matched) {
                const payload = {
                    username: result.username  
                };
                let token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: "24h" 
                });

                console.log(token)

                resolve({
                    success: true,
                    message: "LoggedIn successfully",
                    token: token
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


exports.updateProfile = async function(profileBody){
    return new Promise(async (resolve, reject) => {
        try{

            let userData = await User.findOne({username: profile.username});


            let profile = new User({
                maidenName: profileBody.maidenName ? profileBody.maidenName : userData.maidenName, 
                firstName: profileBody.firstName ? profileBody.firstName : userData.firstName,
                lastName: profileBody.lastName ? profileBody.lastName : userData.lastName,
                headline: profileBody.headline ? profileBody.headline : userData.headline,
                location: profileBody.location ? profileBody.location : userData.location,
                industry: profileBody.industry ? profileBody.industry : userData.industry,
                summary: profileBody.summary ? profileBody.summary : userData.summary,
                specialties: profileBody.specialties ? profileBody.specialties : userData.specialties,
                mobile: profileBody.mobile ? profileBody.specialties : userData.specialties,
                dateOfBirth: profileBody.dateOfBirth ? profileBody.dateOfBirth : userData.dateOfBirth,
                maritalStatus: profileBody.maritalStatus ? profileBody.maritalStatus : userData.maritalStatus
            });

            profile.save(function(err, data) {
                if (err) {
                    console.error(err);
                    return reject(err);
                }

                resolve({
                    success: true,
                    message: "Profile created successfully."
                })
            })
            return;
            
        }catch(error){
            console.log(error);
            reject(error);
        }
    })
}