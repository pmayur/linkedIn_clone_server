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
    location: {
        type: Schema.Types.ObjectId, 
        ref: 'Address',
        default: null
    },
    industry: {
        type: Schema.Types.ObjectId, 
        ref: 'Industry',
        default: null
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
    specialties: {
        type : String,
        default: ''
    },
    positions: [{
        type: Schema.Types.ObjectId, 
        ref: 'Position',
        default: null
    }],
    pictureUrl: {
        type: String,
        default: ''
    },
    pictureUrlUnformatted: {
        type: String,
        default: ''
    },
    publicProfileUrl:  {
        type: String,
        default: ''
    },
    siteStandardProfileRequest: {
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
    currentCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Company',
        default: null
    },
    connection: [{
        type: Schema.Types.ObjectId, 
        ref: 'Connection',
        default: null
    }],
    createdAt: {
        type: Number
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum : ['Male', 'Female', 'Others'],
    },
    maritalStatus: {
        type: String,
        enum : ['Unmarrieda' ,'Married']
    },
    lastLoggedIn: {
        type: Number
    }
});

userSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return moment(this.dateOfBirth).format('MMMM, YYYY');
    });

var Users = module.exports = mongoose.model('users', userSchema);
