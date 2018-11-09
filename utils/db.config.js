
let mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

function mongoConnection() {
    return new Promise(async (resolve, reject) => {
        try {
            //Create mongo connection.
            let connection = await mongoose.connect(process.env.MONGO_URL_DEV);
            resolve(connection);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}

mongoConnection();
