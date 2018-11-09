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
    email: {
        type: String,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    mobile : {
        type: Number,
        index: true,
        default: null
    },
    picUrl: {
        type: String,
        default: ''
    },
    profileBio: {
        type: String,
        default: ''
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
        enum : ['Single' ,'Married']
    },
    userSubscriptionType: {
        type: String,
        enum : ['Free' ,'Premium'],
        default: 'Free'
    },
    location: {
        type: Schema.Types.ObjectId, 
        ref: 'Address',
        default: null
    },
    positions: [{
        type: Schema.Types.ObjectId, 
        ref: 'Position',
        default: null
    }],
    lastLoggedIn: {
        type: Number,
        default: null
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
