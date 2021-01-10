const mongoose = require('mongoose');

const timeoutSchema = mongoose.Schema({
    _id: String,
    defaultRole: String,
    timeoutRole: String,
});

const timeoutDB = mongoose.connection.useDb('Timeout');

module.exports = guildID => {
    return timeoutDB.model('Timeout', timeoutSchema, guildID);
}