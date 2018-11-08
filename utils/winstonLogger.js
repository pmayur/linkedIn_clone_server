'use strict';
let util = require('util');
let winston = require('winston');
const { combine, timestamp, label, prettyPrint } = winston.format;
require('winston-daily-rotate-file');
let nodeEnvironment = deployConfig.get('NODE_ENV');

//Read log level from configuration
// console.log('Logging in ', nodeEnvironment, 'mode.');
let configuredLogLevel = deployConfig.get('log_level');
if (['info', 'debug', 'warn', 'error'].indexOf(configuredLogLevel) == -1) {
    throw new Error('Invalid log level provided in configuration:', configuredLogLevel);
}

var logger = winston.createLogger({
    level: configuredLogLevel,
    format: combine(
        timestamp(),
        winston.format.splat(),
        winston.format.simple()
    ),
    // format: winston.format.json(),
    exitOnError: true
});

//Add console logger if not production.
// if (nodeEnvironment == 'production' || nodeEnvironment == 'staging') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
// }


//Add file logger if production
// if (nodeEnvironment == 'production' || nodeEnvironment == 'staging') {

    // Exception logger
    logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'warning', handleExceptions: true }));

    // File based daily logger
    logger.add(new (winston.transports.DailyRotateFile)({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: false,
        maxSize: '20m',
        maxFiles: '14d'
    }));
// }

function formatArgs(args) {
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

console.log = function () {
    logger.info.apply(logger, formatArgs(arguments));
};
console.info = function () {
    logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function () {
    logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function () {
    logger.error.apply(logger, formatArgs(arguments));
};
console.debug = function () {
    logger.debug.apply(logger, formatArgs(arguments));
};