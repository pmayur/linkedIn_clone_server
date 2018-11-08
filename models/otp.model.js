var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');


var userOtp = mongoose.Schema({
    mobile: {
        type: Number
    },
    otp: {
        type: Number,
    },
    createdAt: {
        type: Number,
        default: moment().valueOf()
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
});

var OTP = module.exports = mongoose.model('userOtp', userOtp);