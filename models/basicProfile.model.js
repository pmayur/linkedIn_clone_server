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
    maidenName : {
        type: String,
        default: ''
    },
    headline: {
        type : String,
        default: 'true'
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
    joinedOn: {
        type: Number,
        default: moment().valueOf()
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
        enum : ['Single' ,'Married']
    },
    userSubscriptionType: {
        type: String,
        enum : ['Free' ,'Premium'],
        default: 'Free'
    },
    lastLoggedIn: {
        type: Number,
        default: moment().valueOf()
    }
});

userSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

userSchema
    .virtual('joinedOn_formatted')
    .get(function () {
        return moment(this.joinedOn).format('MMMM Do, YYYY');
    });

userSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return moment(this.date_of_birth).format('MMMM, YYYY');
    });

var Users = module.exports = mongoose.model('users', userSchema);
