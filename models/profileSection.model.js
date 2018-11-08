var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var profileSectionSchema = mongoose.Schema({
    section: {
        type: String
    },
    profileSectionType: [{
        type: Schema.Types.ObjectId, 
        ref: 'ProfileSectionsType'
    }],
    createdAt: { 
        type: Number,
        default: moment().valueOf()
    },
    updatedAt :{
        type: Number,
        default: moment().valueOf()
    },
    description : {
        type: String
    }
});

var ProfileSection = module.exports = mongoose.model('profile_sections', profileSectionSchema);