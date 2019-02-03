var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var positionSchema = mongoose.Schema({
    title: {
        type: String
    },
    summary: {
        type: String
    },
    startDate: {
        type: Number,
        default: moment().valueOf()
    },
    endDate: {
        type: Number,
        default: moment().valueOf()
    },
    isCurrent : {
        type: Boolean,
    },
    company:{
        type: Schema.Types.ObjectId, 
        ref: 'Company'
    }
});

var Position = module.exports = mongoose.model('positions', positionSchema);