var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var followingSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    followings: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

var Followings = module.exports = mongoose.model('followings', followingSchema);




