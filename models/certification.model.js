var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

var certificationSchema = mongoose.Schema({
    name: { 
        type: String
    },
    authority: {
        type: String
    },
    number: {
        type: String // license number of certification
    },
    startDate: {
        type: Number
    },
    endDate: {
        type: Number
    }
});

var Certification = module.exports = mongoose.model('certifications', certificationSchema);