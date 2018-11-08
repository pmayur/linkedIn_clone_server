var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var userProfileSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt: {
        type: Number,
        default: moment().valueOf()
    },
    updatedAt: {
        type: Number,
        default: moment().valueOf()
    }
});

var UserProfile = module.exports = mongoose.model('user_profiles', userProfileSchema);