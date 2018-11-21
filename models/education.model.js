var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var educationSchema = mongoose.Schema({
    schoolName: {
        type: String
    },
    fieldOfStudy: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    degree: {
        type: String
    },
    activities: {
        type: String
    },
    notes: {
        type: String
    }
});

var Education = module.exports = mongoose.model('educations', educationSchema);