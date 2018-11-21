var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

var patentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    number: {
        type: String // patent number
    },
    status: {
        type: Number,
        enum : [0 ,1] // "Application", "Patent"
    },
    office: {
        type: Object
    },
    inventors: [{
        id: Number,
        name: String,
        person: {
            type: Object
        }
    }],
    date: {
        type: Date
    },
    url :{
        type: String
    }
});

var ProfileSectionType = module.exports = mongoose.model('patents', patentSchema);