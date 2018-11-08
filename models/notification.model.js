var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

var notificationSchema = mongoose.Schema({
    message:String,
    description:String,
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    isRead:{
        type:Boolean,
        default:false
    }
});
var Notification = module.exports = mongoose.model('notifications', notificationSchema);