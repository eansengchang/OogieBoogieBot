const vlogSchema = require('@models/vlog-schema');
const voteChannelSchema = require('@models/vote-channel-schema');

module.exports = async (client) => {
    //message logging

    client.on('message', async (message) => {
        if(!message.guild) return;

        let voteChannelCollection = voteChannelSchema();
        let channels = await voteChannelCollection.find({ serverID: message.guild.id })
        let flag = false;
        channels.forEach(voteChannelObj => {
            if (message.channel.id === voteChannelObj.voteChannelID) {
                flag = true;
            }
        });

        if (flag) {
            try {
                message.react('👍');
                message.react('👎');
            } catch {
                return;
            }
        }
    })
}