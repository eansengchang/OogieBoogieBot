const SQLite = require("better-sqlite3");
const sql = new SQLite('./activity.sqlite');
const Discord = require('discord.js');

module.exports = {
    name: 'activity-reset',
    description: 'resets the activity',
    expectedArgs: '@user',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    execute: (message, args) => {
        if (args[0] === 'all') {
            sql.prepare(`DELETE FROM \`${message.guild.id}\``).run();
            return message.channel.send('I have successfully reset all activity.')
        } else {

            const user = message.mentions.users.first();
            if(!user){return message.reply('User not found!');}
            activity = { id: `${message.author.id}`, usertag: message.author.tag, lastUpdate: `${message.createdTimestamp}`, messages: 0, voice: 0, isVoice: 0, voiceJoinedStamp: '' };
            message.client.setActivity.run(activity);
            message.channel.send(`I have resetted <@${user.id}>'s activity`);
        }
    },
};