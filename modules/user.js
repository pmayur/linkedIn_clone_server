let UserModel = require("../models/basicProfile.model");
let uniqid = require("uniqid");
let moment = require("moment");
let utilsModule = require("./utils.js");
var bcrypt = require('bcrypt-nodejs');

exports.updateBasicProfile = function(basicProfile) {
    return new Promise((resolve, reject) => {
        try {
            let UserData = await UserModel.findById({_id: basicProfile.userId});


        } catch (error) {
            reject(error);
        }
    })
}