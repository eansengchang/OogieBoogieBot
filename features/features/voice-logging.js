const vlogSchema = require('@models/vlog-schema');
const fetch = require('node-fetch');

module.exports = async (client) => {
    //message logging

    client.on('voiceStateUpdate', async (state1, state2) => {
        let vlogCollection = vlogSchema(state1.guild.id);
        let obj = await vlogCollection.findOne({ _id: 'channel' })

        if (!obj) return;
        let vlogChannel = state1.guild.channels.cache.get(obj.vlogChannelID);
        if(!vlogChannel) return;

        //connects to channel
        if (state2.channel && !state1.channel) {
            vlogChannel.send(`**${state1.member.user.tag}** joined **${state2.channel.name}**`)
        }

        //disconnects from a channel
        else if (state1.channel && !state2.channel) {
            vlogChannel.send(`**${state1.member.user.tag}** left **${state1.channel.name}**`)
        }

        else if (state1.channelID !== state2.channelID) {
            vlogChannel.send(`**${state1.member.user.tag}** moved from **${state1.channel.name}** to **${state2.channel.name}**`)
        }
    })
}