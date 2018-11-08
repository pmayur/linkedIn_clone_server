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