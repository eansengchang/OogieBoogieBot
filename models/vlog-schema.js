const mongoose = require('mongoose');

const vlogSchema = mongoose.Schema({
    _id: String,
    vlogChannelID: String,
});

const vlogDB = mongoose.connection.useDb('Vlog');

module.exports = guildID => {
    return vlogDB.model('Vlog', vlogSchema, guildID);
}