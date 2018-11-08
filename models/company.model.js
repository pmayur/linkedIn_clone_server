var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var companySchema = mongoose.Schema({
    createdBy: {
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
    name: {
        type: String
    },
    isDeleted: {
        type: Boolean
    },
    description: {
        type:String
    },
    website: {
        type: String
    },
    address:{
        type: Schema.Types.ObjectId, 
        ref: 'Address'
    },
    type:{
        type: String
    },
    size:{
        type: Number
    },
    followers:[{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    logoUrl: {
        type: String
    },
    coverUrl: {
        type: String
    }
});

var Company = module.exports = mongoose.model('companies', companySchema);




