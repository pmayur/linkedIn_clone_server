var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var distributionTargetSchema = mongoose.Schema({
    mediaId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    updatedAt:{
        type: Number,
        default: moment().valueOf()
    },
    target: {
        type: string,
        enum: ["public", "connections"]
    },
    allowComments: {
        type: Boolean
    }
});

var MediaDistribution = module.exports = mongoose.model('distributions', distributionTargetSchema);