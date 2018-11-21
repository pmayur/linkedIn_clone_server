var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

var languageSchema = mongoose.Schema({
    name: { 
        type: String
    },
    proficiency: {
        type: String,

        // Elementary proficiency
        // Limited working proficiency
        // Professional working proficiency
        // Full professional proficiency
        // Native or bilingual proficiency

        enum: ["elementary", "limited_working", "professional_working", "full_professional", "native_or_bilingual"]
    }
});

var Language = module.exports = mongoose.model('languages', languageSchema);