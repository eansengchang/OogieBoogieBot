const vlogSchema = require('@models/vlog-schema');
const { Message } = require('discord.js');
const fetch = require('node-fetch');

let inCall = [];

module.exports = async (client) => {
    //message logging

    client.on('voiceStateUpdate', async (state1, state2) => {
        let vlogCollection = vlogSchema(state1.guild.id);
        let obj = await vlogCollection.findOne({ _id: 'channel' })

        if (!obj) return;
        let vlogChannel = state1.guild.channels.cache.get(obj.vlogChannelID);
        if (!vlogChannel) return;
        //connects to channel
        if (state2.channel && !state1.channel) {
            vlogChannel.send(`**${state1.member.user.tag}** joined **${state2.channel.name}**`)
            inCall.push(`${state1.member.id}-${Date.now()}`)
        }


        //disconnects from a channel
        else if (state1.channel && !state2.channel) {
            let text = `**${state1.member.user.tag}** left **${state1.channel.name}** `;

            let member = inCall.filter(string => {
                return string.includes(state1.member.id)
            })
            inCall = inCall.filter(string => {
                return !string.includes(state1.member.id)
            })
            console.log('member: ',member);
            console.log('incall: ', inCall)
            if (!member[0]) {
                console.log('no member[0]: ', member)
                return
            }

            let array = member[0].split('-');
            let time = Math.floor((Date.now() - array[1]) / 1000);

            if (time < 60) text += `[Call time: **${time}s**]`;
            else if (time / 60 < 60) text += (`[Call time: **${Math.floor(time / 60)}m**]`);
            else text += (`[Call time: **${Math.floor(time / 60 / 60)}hr${(time / 60) % 60}m**]`);

            vlogChannel.send(text)
        }

        else if (state1.channelID !== state2.channelID) {
            vlogChannel.send(`**${state1.member.user.tag}** moved from **${state1.channel.name}** to **${state2.channel.name}**`)
        }
    })
}