var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

// define the schema for our user model
var companySchema = mongoose.Schema({
    name: {
        type: String
    },
    universalName: {
        type: String,
        unique: true
    },
    emailDomains: [{
        type: String
    }],
    companytype: {
        type: String,
        // C ("Public Company")
        // D ("Educational")
        // E ("Self Employed")
        // G ("Government Agency")
        // N ("Non Profit")
        // O ("Self Owned")
        // P ("Privately Held")
        // S ("Partnership")
        enum : ['C' ,'D', 'E', 'G', 'N', 'O', 'P', 'S']
    },
    ticker: {
        type: String, // available only for public companies
        unique: true
    },
    websiteUrl: {
        type: String
    },
    industries: {
        type: Schema.Types.ObjectId, 
        ref: 'Industry'
    },
    status: {
        type: String,
        // OPR ("Operating")
        // OPS ("Operating Subsidiary")
        // RRG ("Reorganizing")
        // OOB ("Out of Business")
        // ACQ ("Acquired")
        enum: ['OPR', 'OPS', 'RRG', 'OOB', 'ACQ']
    },
    logoUrl: {
        type: String,
        default: ''
    },
    squareLogoUrl: {
        type: String,
        default: ''
    },
    blogRssUrl: {
        type: String,
        default: ''
    },
    twitterId: {
        type: String,
        default: ''
    },
    employeeCountRange: {
        type: String,
        // A:1
        // B: 2-10
        // C: 11-50
        // D: 51-200
        // E: 201-500
        // F: 501-1000
        // G: 1001-5000
        // H: 5001-10,000
        // I: 10,000+
        enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    },
    specialties: {
        type: String
    },
    locations: [{
        type: Schema.Types.ObjectId, 
        ref: 'Address'
    }],
    locationHQ:{
        type: Schema.Types.ObjectId, 
        ref: 'Address'
    },
    stockExchange: {
        type: String,

        // ASE (1, "American Stock Exchange")
        // NYS (2, "New York Stock Exchange")
        // NMS (3, "NASDAQ")
        // LSE (4, "London Stock Exchange")
        // FRA (5, "Frankfurt Stock Exchange")
        // GER (6, "XETRA Trading Platform")
        // PAR (7, "Euronext Paris")
    
        enum: ['ASE', 'NYS', 'NMS', 'LSE', 'FRA', 'GER', 'PAR']
    },
    foundedYear: {
        type: Date
    },
    endYear: {
        type: Date
    },
    numOfFollowers: {
        type: Number
    },
    description: {
        type: String
    },
    createdAt:{
        type: Number,
        default: moment().valueOf()
    },
    updatedAt:{
        type: Number,
        default: moment().valueOf()
    },
    coverUrl: {
        type: String,
        default: ''
    }
});

var Company = module.exports = mongoose.model('companies', companySchema);




