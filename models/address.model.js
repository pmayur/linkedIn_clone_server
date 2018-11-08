var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var connectionSchema = mongoose.Schema({
    country: {
        type: String
    },
    city:{
        type: String
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    }
});

var Connection = module.exports = mongoose.model('connections', connectionSchema);




