const Discord = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Info on this bot!',
    execute: async (message, args) => {

        let channels = 0;
        let serverMembers = 0;
        message.client.guilds.cache.array().forEach(guild => {
            channels += guild.channels.cache.size;
            serverMembers += guild.members.cache.size;
        });
        
        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Information on Ching Chong Bot`)
            .setThumbnail(message.client.user.displayAvatarURL())
            .addFields(
                { name: 'Created by:', value: `ESC#3777` , inline: false },
                { name: 'Created on:', value: `${message.client.user.createdAt.toDateString()}` , inline: false },
                { name: 'Servers:', value: `${message.client.guilds.cache.size}` , inline: false },
                { name: 'Channels:', value: `${channels}` , inline: false },
                { name: 'Server members:', value: `${serverMembers}` , inline: false },
                { name: 'Commands:', value: `${message.client.commands.size}` , inline: false },
                { name: 'Uptime:', value: `Online since \`${message.client.readyAt.toDateString()}\`` , inline: false },
            )
        message.channel.send(embed);
    },
};