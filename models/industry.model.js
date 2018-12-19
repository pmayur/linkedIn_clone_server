var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var groupSchema = mongoose.Schema({
    code: {
        type: String
    },
    groups: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Number,
        default: moment().valueOf()
    },
    updatedAt:{
        type: Number,
        default: moment().valueOf()
    }
});

var Group = module.exports = mongoose.model('groups', groupSchema);