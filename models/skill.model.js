var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

var skillSchema = mongoose.Schema({
    name: { 
        type: String
    }
});

var Skill = module.exports = mongoose.model('skills', skillSchema);