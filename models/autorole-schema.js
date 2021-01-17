const mongoose = require('mongoose');

const autoRoleSchema = mongoose.Schema({
    _id: String,
    autoRole: String,
});

const autoRoleDB = mongoose.connection.useDb('Autorole');

module.exports = guildID => {
    return autoRoleDB.model('Autorole', autoRoleSchema, guildID);
}