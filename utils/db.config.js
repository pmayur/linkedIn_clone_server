var MongoClient = require("mongodb").MongoClient;


function mongoConnection() {
    return new Promise(async (resolve, reject) => {
        try {
            //Create mongo connection.
            var connection = await MongoClient.connect(process.env.MONGO_URL, {
                useNewUrlParser: true, poolSize: 10, reconnectInterval: 100
            });
            connection.on('close', () => { console.error('Lost mongo connection.'); });
            connection.on('reconnect', () => { console.error('Reconnected mongo connection automatically.'); });
        
            // connection.Promise = global.Promise;
            global.mongo = connection;
            resolve(connection);
        } catch (error) {
            var newErr = new Error('Failed to connect mongo db.');
            newErr.stack += '\nCaused by: ' + error.stack;
            console.error(newErr);
            reject(newErr);
        }
    })
}

mongoConnection();
