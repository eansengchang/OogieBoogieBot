const { number } = require('mathjs');
const mongoose = require('mongoose');

const economySchema = mongoose.Schema({
    _id: String,
    money: Number,
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('Economy', economySchema, 'economy');
}