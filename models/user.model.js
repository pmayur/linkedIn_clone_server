var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
let validator = require('validator');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    picUrl: {
        type: String
    },
    profileBio: {
        type: String,
        default: ''
    },
    currentCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Company'
    },
    connection: [{
        type: Schema.Types.ObjectId, 
        ref: 'Connection'
    }],
    joinedOn: {
        type: Number,
        default: moment().valueOf()
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum : ['Male', 'Female', 'Others'],
    },
    maritalStatus: {
        type: String,
        enum : ['Single' ,'Married']
    },
    userSubscriptionType: {
        type: String,
        enum : ['Free' ,'Premium'],
        default: 'Free'
    },
    location: {
        type: Schema.Types.ObjectId, 
        ref: 'Address'
    },
    positions: [{
        type: Schema.Types.ObjectId, 
        ref: 'Position'
    }]
});

userSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

userSchema
    .virtual('joinedOn_formatted')
    .get(function () {
        return moment(this.joinedOn).format('MMMM Do, YYYY');
    });

userSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return moment(this.date_of_birth).format('MMMM, YYYY');
    });

var Users = module.exports = mongoose.model('users', userSchema);


// create entry for user
module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, null, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// get user by username
module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}


// get user by id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}


//compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}


