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
            activity = { id: `${user.id}`, userid: user.tag, messages: 0, lastUpdate: `${message.createdTimestamp}` }
            client.setActivity.run(activity);
        }
        let days = Math.round((message.createdTimestamp - activity.lastUpdate) / 1000 / 60 / 60 / 24)
        if (days === 0){
            days = 1;
        }
        let messagesPerDay = activity.messages / days;

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Activity info for ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Activity:', value: `${messagesPerDay} m/d`, inline: false },
                { name: 'Messages:', value: `${activity.messages} messages`, inline: false },
                { name: 'Days logged:', value: `${days} days`, inline: false },
            )
            .setFooter(`requested by ${message.author.tag}`)
        message.channel.send(embed);
    },
};