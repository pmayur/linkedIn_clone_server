let Bluebird = require("bluebird");
var uniqid = require("uniqid");
let moment = require("moment");
let async = require("async");
var bcrypt   = Bluebird.promisifyAll(require("bcrypt-nodejs"));
const {ObjectId} = require('mongodb');


// models
let User = require("../models/basicProfile.model");


exports.signup = async function (firstName, lastName, email, password) {
    return new Promise(async (resolve, reject) => {
        try {
            // generate hashed password
            let salt = await bcrypt.genSaltAsync(10);
            let hashPassowrd = await bcrypt.hashAsync(password, salt, null);


            let username = firstName.toLowerCase() + "-" + lastName.toLowerCase() + "-" + uniqid();

            // check usrname already exists or not
            let userNameCheck = await User.find({"username": username})

            if (userNameCheck.length > 0 && userNameCheck !== null) {

                username = firstName.toLowerCase() + "-" + lastName.toLowerCase() + "-" + uniqid();
            } 

            // create user object from User Model to save into mongo db 
            let user = new User({
                username: username,
                email: email,
                password: hashPassowrd,
                firstName: firstName,
                lastName: lastName
            })

            // check email id already exists or not
            let emailIdCheck = await User.find({
                "email": email
            });

            if (emailIdCheck.length > 0 && emailIdCheck !== null) {

                resolve({
                    success: false,
                    message: "Email already exists"
                })
                return;
            } 

            // create user entry in mongo
            await user.save();

            resolve({
                success: true,
                data: data[0]
            });

        } catch (error) {
            console.error(error)
            reject(error);
        }
    })
}

exports.login = function (username, email, password) {

    return new Promise(async (resolve, reject) => {
        try {
            
            let result = await User.find({ "email": email });

            if (result.length > 0 && result !== null) {
                // compare input password with db hashed password
                let isMatch = await bcrypt.compareAsync(password, result.password);

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
            } else {
                resolve({
                    success: false,
                    message: "No such email is associated with our system."
                })
            }
        } catch (error) {
            console.error(error)
            reject(error);
        }
    })
}