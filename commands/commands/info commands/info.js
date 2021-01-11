const Discord = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Info on this bot.',
    execute: async (message, args) => {

        let channels = 0;
        let serverMembers = 0;
        message.client.guilds.cache.array().forEach(guild => {
            channels += guild.channels.cache.size;
            serverMembers += guild.members.cache.size;
        });

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`PsyBot Website`)
            .setURL('https://psybotdashboard.herokuapp.com/')
            .setThumbnail(message.client.user.displayAvatarURL())
            .addFields(
                { name: 'Created by:', value: `ESC#3777`, inline: false },
                { name: 'Created on:', value: `${message.client.user.createdAt.toDateString()}`, inline: false },
                { name: 'Servers:', value: `${message.client.guilds.cache.size}`, inline: false },
                { name: 'Total Channels:', value: `${channels}`, inline: false },
                { name: 'Total Server members:', value: `${serverMembers}`, inline: false },
                { name: 'Commands:', value: `${message.client.commands.size}`, inline: false },
            )
        let uptime = message.client.uptime;
        let days = Math.floor(uptime / 1000 / 60 / 60 / 24)
        uptime -= days * 1000 * 60 * 60 * 24;

        let hours = Math.floor(uptime / 1000 / 60 / 60)
        uptime -= hours * 1000 * 60 * 60;

        let minutes = Math.floor(uptime / 1000 / 60)
        uptime -= minutes * 1000 * 60;

        let seconds = Math.floor(uptime / 1000)
        uptime -= seconds * 1000;

        embed.addFields(
            { name: 'Uptime:', value: `Online for \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``, inline: false },
        )
        message.channel.send(embed);
    },
};