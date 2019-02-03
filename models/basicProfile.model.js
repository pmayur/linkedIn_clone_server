var mongoose = require('mongoose');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    headline: {
        type : String,
        default: ''
    },
    address: {
        country: String,
        state: String,
        city: String
    },
    industry: {
        type: String
    },
    currentShare: [{
        type: Schema.Types.ObjectId, 
        ref: 'Media',
        default: null
    }],
    numOfConnections : {
        type : Number, //capped at 500
        default: 0
    },
    numOfconnectionsCapped: {
        type: Boolean,
        default: false
    },
    summary: {
        type : String,
        default: ''
    },
    pictureUrl: {
        type: String,
        default: ''
    },
    publicProfileUrl:  {
        type: String,
        default: ''
    },
    email: {
        type: String,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile : {
        type: Number,
        index: true,
        default: null
    },
    createdAt: {
        type: Number
    },
    lastLoggedIn: {
        type: Number
    }
});

var Users = module.exports = mongoose.model('users', userSchema);
