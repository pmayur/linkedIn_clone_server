var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');


var publicationSchema = mongoose.Schema({
    title: { 
        type: String,
        unique: true
    },
    publisher: {
        type: String // name of publisher
    },
    authors: [{
        id: Number,
        name: String        
    }],
    date: {
        type: Date
    },
    url: {
        type: String
    },
    summary: {
        type: String
    }
});

var Publication = module.exports = mongoose.model('publications', publicationSchema);