const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const dailyRewardsSchema = mongoose.Schema({
    userID: reqString
}, {
    timestamps: true
});

const OogieBoogieDB = mongoose.connection.useDb('OogieBoogieBot');

module.exports = () => {
    return OogieBoogieDB.model('daily-rewards', dailyRewardsSchema);
}