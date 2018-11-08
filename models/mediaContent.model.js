var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var mediaContentSchema = mongoose.Schema({
    shareMediaCategory: {
        type: Schema.Types.ObjectId, 
        ref: 'Category'
    },
    description : {
        type: Schema.Types.ObjectId, 
        ref: 'Job'
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    updatedAt:{
        type: Number,
        default: moment().valueOf()
    }
});

var MediaContent = module.exports = mongoose.model('media_contents', mediaContentSchema);