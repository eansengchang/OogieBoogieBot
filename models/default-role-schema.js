const mongoose = require('mongoose');

const defaultRoleSchema = mongoose.Schema({
    _id: String,
    defaultRole: String,
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('Default-role', defaultRoleSchema, 'default-role');
}