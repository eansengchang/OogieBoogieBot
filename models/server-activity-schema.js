const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: String,
    userTag: String,
    lastUpdate: String,
    messages: Number,
    voice: Number,
    isVoice: Boolean,
    voiceJoinedStamp: String
});

module.exports = guildID => {
    return mongoose.model('Activity', guildSchema, guildID);
}