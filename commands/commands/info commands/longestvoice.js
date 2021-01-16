const Discord = require('discord.js');
const highestVoiceSchema = require('@models/vlog-highest-schema');

const width = 1200;
const height = 800;

module.exports = {
    name: 'longestvoice',
    description: 'Who has the record for the longest voice?',
    expectedArgs: '',
    guildOnly: true,
    execute: async (message, args) => {

        let highestVoiceCollection = highestVoiceSchema(message.guild.id);
        let highestVoice = await highestVoiceCollection.findOne({ _id: 'highestVoice' })

        if (!highestVoice) {
            return message.channel.send('No data yet...')
        }

        let text = `record held by <@${highestVoice.highestMemberID}>: `;
        let record = highestVoice.time;

        if (record < 60)
            text += `**${record}s**`
        else if (record / 60 < 60)
            text += `**${Math.floor(record / 60)}m${Math.floor(record % 60)}s**`
        else
            text += `**${Math.floor(record / 60 / 60)}hr${Math.floor((record / 60) % 60)}m**`

        message.channel.send(text)
    },
};