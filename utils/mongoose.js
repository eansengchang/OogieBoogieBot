const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family:4
        };

        mongoose.connect(`mongodb+srv://esc:${process.env.MONGO_PASSWORD}@activity.0d7q6.mongodb.net/Activity?retryWrites=true&w=majority`, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log(`\nMongoose has successfully connected to Activity!`);
        });

        mongoose.connection.on('err', err => {
            console.error(`Mongoose connection error: \n${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn(`Mongoose connection lost on Activity`);
        });
    }
}