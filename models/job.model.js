var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var jobSchema = mongoose.Schema({
    postedBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    companyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Company'
    },
    title:{
        type: String
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    jobProfile: {
        type: String
    },
    views :{
        type: Number
    },
    location: {
        type: Schema.Types.ObjectId, 
        ref: 'Address'
    }
});

var Job = module.exports = mongoose.model('jobs', jobSchema);