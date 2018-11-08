var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var commentSchema = mongoose.Schema({
    commentedBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    mediaId: {
        type: Schema.Types.ObjectId, 
        ref: 'Media'
    }, 
    description: {
        type: String
    },
    createdAt: {
        type: Number,
        default: moment().valueOf()
    },
    updatedAt: {
        type: Number,
        default: moment().valueOf()
    }
});

var Comment = module.exports = mongoose.model('comments', commentSchema);