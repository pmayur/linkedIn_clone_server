var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var profileSectionTypeSchema = mongoose.Schema({
    type: { // certification, languages, accomplisment, skills, experience, education, interests
        type: String,
        unique: true
    }
});

var ProfileSectionType = module.exports = mongoose.model('profile_sections_types', profileSectionTypeSchema);