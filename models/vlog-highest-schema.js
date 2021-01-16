const mongoose = require('mongoose');

const highestVoiceSchema = mongoose.Schema({
    _id: String,
    highestMemberID: String,
    time: String,
});

const vlogDB = mongoose.connection.useDb('Vlog');

module.exports = guildID => {
    return vlogDB.model('Vlog', highestVoiceSchema, guildID);
}