const mongoose = require('mongoose');

const timeoutRoleSchema = mongoose.Schema({
    _id: String,
    timeoutRole: String,
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('Timeout-role', timeoutRoleSchema, 'timeout-role');
}