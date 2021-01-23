const mongoose = require('mongoose');

const autoRoleSchema = mongoose.Schema({
    _id: String,
    autoRole: String,
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('Auto-role', autoRoleSchema, 'auto-role');
}