var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var addressSchema = mongoose.Schema({
    name: {
        type: String
    },
    countryCode:{
        type: String
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    }
});

var Address = module.exports = mongoose.model('addresses', addressSchema);




