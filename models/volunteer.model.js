var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

var volunteerSchema = mongoose.Schema({
    volunteerExperiences: [{
        id: Number,
        organization: Number,
        organizationName: String,
        role: String    
    }],
    causes: {
        type: String
    },
    opportunities: {
        type: String
    }
});

var Volunteers = module.exports = mongoose.model('volunteers', volunteerSchema);