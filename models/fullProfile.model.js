var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var userProfileSchema = mongoose.Schema({
    lastModifiedTimestamp: {
        type: Number,
        default: moment().valueOf()
    },
    associations: [{
        type: String
    }],
    interests: [{
        type: String
    }],
    publications: {
        type: Schema.Types.ObjectId, 
        ref: 'Publication'
    },
    patents: [{
        type: Schema.Types.ObjectId, 
        ref: 'Patent'
    }],
    languages: [{
        type: Schema.Types.ObjectId, 
        ref: 'Patent'
    }],
    skills: [{
        type: Schema.Types.ObjectId, 
        ref: 'Skill'
    }],
    certifications: [{
        type: Schema.Types.ObjectId, 
        ref: 'Certification'
    }],
    educations: [{
        type: Schema.Types.ObjectId, 
        ref: 'Education'
    }],
    courses: [{
        type: Schema.Types.ObjectId, 
        ref: 'Course'
    }],
    volunteer: [{
        type: Schema.Types.ObjectId, 
        ref: 'Volunteer'
    }],
    threeCurrentPositions: [{
        type: Schema.Types.ObjectId, 
        ref: 'Position'
    }],
    threePastPositions: [{
        type: Schema.Types.ObjectId, 
        ref: 'Position'
    }],
    numOfRecommenders: [{
        type: Number
    }],
    recommendationRecieved: [{
        type: Schema.Types.ObjectId, 
        ref: 'Recommendation'
    }],
    following: [{
        modelType:{
            type: String
        },
        followingType:{
            type: Schema.Types.ObjectId,
            refPath: 'modelType'
        }
    }],
    // userFollowing: [{
    //     type: Schema.Types.ObjectId,
    //     refPath: 'User'
    // }],
    // companyFollowing: [{
    //     type: Schema.Types.ObjectId,
    //     refPath: 'Company'
    // }],
    // industryFollowing: [{
    //     type: Schema.Types.ObjectId,
    //     refPath: 'Industry'
    // }],
    jobBookmarks: [{
        type: Schema.Types.ObjectId,
        refPath: 'Job'
    }],
    suggestions: [{
        modelType:{
            type: String
        },
        followingType:{
            type: Schema.Types.ObjectId,
            refPath: 'modelType'
        }
    }],
    dateOfbirth: {
        date: Number,
        month: Number,
        year: Number
    },
    memberUrlResources: [{
        type: String
    }],
    relatedProfileViews: [{
        type: Schema.Types.ObjectId,
        refPath: 'User'
    }],
    honorAwards: [{
        type: Object
    }]
});

var UserProfile = module.exports = mongoose.model('user_profiles', userProfileSchema);