var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var recommendationSchema = mongoose.Schema({
    type: {
        type: String
    },
    summary: {
        type: String
    },
    recommender: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    createdAt: {
        type: Number,
        default: moment().valueOf()
    },
    updatedAt: {
        type: Number,
        default: moment().valueOf()
    },
});

var Recommendation = module.exports = mongoose.model('recommendations', recommendationSchema);