var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var userGroupsSchema = mongoose.Schema({
    groupId: {
        type: Schema.Types.ObjectId, 
        ref: 'Group'
    },
    joinedOn: {
        type: Number,
        default: moment().valueOf()
    },
    leftOn: {
        type: Number,
        default: moment().valueOf()
    },
});

var UserGroup = module.exports = mongoose.model('user_groups', userGroupsSchema);