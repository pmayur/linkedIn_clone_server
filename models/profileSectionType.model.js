var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var profileSectionTypeSchema = mongoose.Schema({
    name: { // certification, languages, accomplisment, skills, Experience, Education, Interests
        type: String
    }
});

var ProfileSectionsType = module.exports = mongoose.model('profile_sections_types', profileSectionTypeSchema);