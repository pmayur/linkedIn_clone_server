var uniqid = require("uniqid");
let moment = require("moment")
let User = require("../models/user.model");
var bcrypt   = require('bcrypt-nodejs');
const {ObjectId} = require('mongodb');

exports.signup = async function (username, email, password, firstName, lastName) {
    return new Promise(async (resolve, reject) => {
        try {
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

            // create user object from User Model to save into mongo db 
            let user = new User({
                username: username,
                email: email,
                password: hashPassowrd,
                firstName: firstName,
                lastName: lastName,
                joinedOn: moment().valueOf(),
                lastLoggedIn: moment().valueOf()
            })

            // check usrname already exists or not
            let userNameCheck = await User.find({
                "username": username
            })
            if (userNameCheck.length > 0 && userNameCheck !== null) {

                resolve({
                    success: false,
                    message: "Username already exists"
                })
                return;
            } 

            // check email id already exists or not
            let emailIdCheck = await User.find({
                "email": email
            })

            if (emailIdCheck.length > 0 && emailIdCheck !== null) {

                resolve({
                    success: false,
                    message: "Email already exists"
                })
                return;
            } 

            // create user entry in mongo
            user.save((err, data) => {
                if (err) reject(err);
                resolve({
                    success: true,
                    data: data[0]
                });
            })

        } catch (error) {
            console.error(error)
            reject(error);
        }
    })
}

exports.login = function (username, email, password) {

    return new Promise(async (resolve, reject) => {
        try {
            
            let result = await User.find({
                "$or": [{ "username": username, "password": password }, { "email": email, "password": password }]
            });

            if (result.length > 0 && result !== null) {
                // compare input password with db hashed password
                bcrypt.compare(password, result.password, function (err, isMatch) {
                    if (err) reject (err);
                    
                    if (isMatch) {
                        let userInfo = {
                            username: result.username,
                            email: result.email,
                            lastLoggedIn: result.lastLoggedIn
                        }
                        resolve({
                            success: true,
                            data: userInfo
                        })
                    } else {
                        resolve({
                            success: false,
                            message: "Incorrect login or password."
                        })
                    }
                });
            } else {
                resolve({
                    success: false,
                    message: "Incorrect login or password."
                })
            }
        } catch (error) {
            console.error(error)
            reject(error);
        }
    })
}