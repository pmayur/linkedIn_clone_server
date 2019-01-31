//Read configuration file
let configFile = null;
process.argv.forEach(function (val, index, array) {
    var arr = val.split(':');
    if (arr.length > 0 && arr[0] == 'config') {
        configFile = arr[1];
    }
});

if (configFile == null) {
    require('dotenv').config()
} else {
    console.info('Reading configuration from', configFile);
    require('dotenv').config({ path: configFile });
}

//Get configuration value method
exports.get = function (key) {
    if (!process.env.hasOwnProperty(key)) {
        throw new Error('Missing configuration key ' + key);
    } else {
        return process.env[key];
    }
}

//Get configuration value method
exports.set = function (key, value) {
    process.env[key] = value;
}

//Check configuration key exists
exports.has = function (key) {
    if (process.env.hasOwnProperty(key)) {
        return true;
    } else {
        return false;
    }
}
