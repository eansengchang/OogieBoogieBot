const mongoose = require('mongoose');

const highestVoiceSchema = mongoose.Schema({
    _id: String,
    highestMemberID: String,
    time: String,
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('Vlog-highest', highestVoiceSchema, 'vlog-highest');
}