var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var connectionSchema = mongoose.Schema({
    connectionRequestUserId: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    connectionAcceptedUserId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    }
});

var Connection = module.exports = mongoose.model('connections', connectionSchema);




