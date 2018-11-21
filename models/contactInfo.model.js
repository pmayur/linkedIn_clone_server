var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var connectionSchema = mongoose.Schema({
    phoneNumbers: [{
        phoneType: {
            type: String,
            enum: ['home', 'work', 'mobile']
        },
        phoneNumber: {
            type: Number
        }
    }],
    boundAccountType: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        },
        accountType: {
            type: String
        },
        bindingStatus: {
            type: String
        },
        isPrimary: {
            type: Boolean
        },
        providerAccountId: {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        },
        providerAccountName: {
            type: String
        }
    }],
    twitterAccounts: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        }
    }],
    primaryTwitterAccounts: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String
        }
    }]
});

var Connection = module.exports = mongoose.model('connections', connectionSchema);




