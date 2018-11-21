var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

var courseSchema = mongoose.Schema({
    name: {
        type: String
    },
    number: {
        type: String,
        unique: true
    }
});

var Course = module.exports = mongoose.model('courses', courseSchema);