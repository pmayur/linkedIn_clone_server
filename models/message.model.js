var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var messageSchema = mongoose.Schema({
    conversationId: {
        type: Schema.Types.ObjectId, 
        ref: 'Conversation'
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    body: {
        type: String
    },
    createdAt: {
        type: Number,
        default: moment().valueOf()
    }
});

var Message = module.exports = mongoose.model('messages', messageSchema);