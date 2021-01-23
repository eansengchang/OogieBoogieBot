const mongoose = require('mongoose');

const vlogSchema = mongoose.Schema({
    _id: String,
    vlogChannelID: String,
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('Vlog', vlogSchema, 'vlog');
}