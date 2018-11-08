var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var groupSchema = mongoose.Schema({
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    name: {
        type: String
    },
    description: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Number,
        default: moment().valueOf()
    },
    updatedAt:{
        type: Number,
        default: moment().valueOf()
    },
    deletedOn:{ 
        type: Number,
        default: moment().valueOf()
    },
    lastActivityAt: {
        type: Number,
        default: moment().valueOf()
    }
});

var Group = module.exports = mongoose.model('groups', groupSchema);