var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var conversationSchema = mongoose.Schema({
    members: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

var Conversation = module.exports = mongoose.model('coversations', conversationSchema);