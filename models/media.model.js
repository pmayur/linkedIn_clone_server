var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var mediaSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    jobId : {
        type: Schema.Types.ObjectId, 
        ref: 'Job'
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    updatedAt:{
        type: Number,
        default: moment().valueOf()
    },
    distributionId:{
        type: Schema.Types.ObjectId,
        ref: 'LinkedInDistributionTarget'
    },
    contentId: {
        type: Schema.Types.ObjectId,
        ref: 'MediaContent'
    }
});

var Media = module.exports = mongoose.model('medias', mediaSchema);