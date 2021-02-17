const { boolean } = require('mathjs');
const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const muteSchema = mongoose.Schema({
    userId: reqString,
    guildId: reqString,
    reason: String,
    staffId: reqString,
    staffTag: reqString,
    expires: {
        type: Date,
        required: true
    },
    current: {
        type: boolean,
        required: true
    }
}, {
    timestamps: true
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('Timeout', muteSchema, 'timeout ');
}