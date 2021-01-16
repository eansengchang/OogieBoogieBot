const vlogSchema = require('@models/vlog-schema');
const { Message } = require('discord.js');

let inCall = [];

module.exports = async (client) => {
    //message logging

    client.on('voiceStateUpdate', async (state1, state2) => {
        let vlogCollection = vlogSchema(state1.guild.id);
        let obj = await vlogCollection.findOne({ _id: 'channel' })

        if (!obj) return;
        let vlogChannel = state1.guild.channels.cache.get(obj.vlogChannelID);
        if (!vlogChannel) return;

        //disconnects from a channel
        if (state1.channel && !state2.channel) {
            let text = `**${state1.member.user.tag}** left **${state1.channel.name}** `;

            let member = inCall.filter(string => {
                return string.includes(state1.member.id)
            })
            inCall = inCall.filter(string => {
                return !string.includes(state1.member.id)
            })
            console.log(`${state1.member.user.tag} has left in ${state1.guild.name}`)
            console.log('member: ',member);
            console.log('inCall: ', inCall)
            if (!member[0]) {
                console.log('no member[0]: ', member);
                vlogChannel.send(text);
                return
            }

            let array = member[0].split('-');
            let time = Math.floor((Date.now() - array[1]) / 1000);

            if (time < 60) text += `[Call time: **${time}s**]`;
            else if (time / 60 < 60) text += (`[Call time: **${Math.floor(time / 60)}m**]`);
            else text += (`[Call time: **${Math.floor(time / 60 / 60)}hr${Math.floor((time / 60) % 60)}m**]`);

            vlogChannel.send(text)
        }
        //connects to channel
        else if (state2.channel && !state1.channel) {
            vlogChannel.send(`**${state1.member.user.tag}** joined **${state2.channel.name}**`)
            inCall.push(`${state2.member.id}-${Date.now()}`)
            console.log(`${state2.member.user.tag} has joined in ${state2.guild.name}`)
            console.log('incall: ', inCall)
        }


        

        else if (state1.channelID !== state2.channelID) {
            vlogChannel.send(`**${state1.member.user.tag}** moved from **${state1.channel.name}** to **${state2.channel.name}**`)
        }
    })
}