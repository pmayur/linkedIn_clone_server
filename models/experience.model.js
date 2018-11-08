var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var experienceSchema = mongoose.Schema({
    jobId: {
        type: Schema.Types.ObjectId, 
        ref: 'Job'
    },
    startedOn: {
        type: Number,
        default: moment().valueOf()
    },
    endedOn: {
        type: Number,
        default: moment().valueOf()
    },
    description : {
        type: String
    },
    location:{
        type: Schema.Types.ObjectId, 
        ref: 'Address'
    }
});

var ProfileSection = module.exports = mongoose.model('experiences', experienceSchema);