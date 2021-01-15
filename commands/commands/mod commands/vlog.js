//const SQLite = require("better-sqlite3");
//const sql = new SQLite('./activity.sqlite');
const Discord = require('discord.js');
const vlogSchema = require('@models/vlog-schema');

module.exports = {
    name: 'vlog',
    description: 'Logs the voice.',
    expectedArgs: '#channel',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 1,
    memberPermissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {
        let vlogCollection = vlogSchema(message.guild.id);

        if (args.length === 0) {
            let channel = await vlogCollection.findOne({ _id: 'channel' })
            if (channel) {
                message.channel.send(`Voice log channel: <#${channel.vlogChannelID}>`)
            } else {
                message.channel.send(`Set up voice logging channel using \`e vlog #channel\``)
            }
            return;
        }

        if(args[0] === off){
            vlogCollection.findOneAndUpdate(
                {
                    _id: 'channel'
                },
                {
                    _id: 'channel',
                    vlogChannelID: ''
                },
                {
                    upsert: true,
                }
            ).exec()
        }

        channel = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first();

        if (!channel || channel.type !== 'text') {
            return message.reply('This is not a valid text channel.')
        }

        vlogCollection.findOneAndUpdate(
            {
                _id: 'channel'
            },
            {
                _id: 'channel',
                vlogChannelID: channel.id
            },
            {
                upsert: true,
            }
        ).exec()

        message.channel.send(`Successfully set the voice log channel to ${channel.name}!`)
    },
};