var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var appliedJobSchema = mongoose.Schema({
    appliedBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    jobProfile: {
        type: String
    },
    applicationStatus: {
        type: String,
        enum : ['Pending' ,'Accepted', 'Rejected'],
    },
    jobId: {
        type: Schema.Types.ObjectId, 
        ref: 'Job'
    }
});

var AppliedJobs = module.exports = mongoose.model('applied_jobs', appliedJobSchema);