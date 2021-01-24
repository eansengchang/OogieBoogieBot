const mongoose = require('mongoose');

const voteChannelSchema = mongoose.Schema({
    serverID: String,
    voteChannelID: String,
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('Vote-channel', voteChannelSchema, 'vote-channel');
}