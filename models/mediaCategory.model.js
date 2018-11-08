var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var mediaCategorySchema = mongoose.Schema({
    name : {
        type: Schema.Types.ObjectId, 
        ref: 'Job'
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    isDeleted:{
        type: Boolean
    }
});

var MediaCategory = module.exports = mongoose.model('media_categories', mediaCategorySchema);