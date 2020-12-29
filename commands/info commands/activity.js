const SQLite = require("better-sqlite3");
const sql = new SQLite('./activity.sqlite');
const Discord = require('discord.js');

module.exports = {
    name: 'activity',
    description: 'See how many messages you\'ve sent',
    expectedArgs: '@user',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 1,
    execute: (message, args) => {
        const user = message.mentions.users.first() || message.author || message.member.user;

        activity = message.client.getActivity.get(user.id);
        if (!activity) {
            activity = { id: `${message.author.id}`, usertag: message.author.tag, lastUpdate: `${message.createdTimestamp}`, messages: 0, voice: 0, isVoice: 0, voiceJoinedStamp: ''};
            client.setActivity.run(activity);
        }
        let days = Math.round((message.createdTimestamp - activity.lastUpdate) / 1000 / 60 / 60 / 24) + 1;
        let messagesPerDay = activity.messages / days;
        let voicePerDay = activity.voice / days;

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${user.username}'s activity in ${message.guild.name}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Activity:', value: `${messagesPerDay} m/d`, inline: false },
                { name: 'Messages:', value: `${activity.messages} messages`, inline: false },
                { name: 'Voice:', value: `${voicePerDay} minutes per day`, inline: false },
                { name: 'Total voice:', value: `${activity.voice} minutes`, inline: false },
                { name: 'Days logged:', value: `${days} days`, inline: false },
            )
            .setFooter(`requested by ${message.author.tag}`)
        message.channel.send(embed);
    },
};