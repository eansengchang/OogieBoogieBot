const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: 'Gets the server info!',
    guildOnly: true,
    execute(message, args) {
        let server = message.guild;
        let daysCreated = Math.round((message.createdTimestamp - server.createdTimestamp) / 1000 / 60 / 60 / 24)

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Information on ${server.name}`)
            .setThumbnail(server.iconURL())
            .addFields(
                { name: 'Servername:', value: `${server.name}`, inline: true },
                { name: 'Owner:', value: `<@!${server.ownerID}>`, inline: true },
                { name: 'Region:', value: `${server.region}`, inline: true },
                { name: 'ID:', value: `${server.id}`, inline: true },
                { name: 'Created at:', value: `\`${server.createdAt.toDateString()}\` (${daysCreated} days ago)` },
                { name: 'Channels:', value: `${server.channels.cache.size}`, inline: true },
                { name: 'Members:', value: `${server.memberCount}`, inline: true },
                { name: 'Roles:', value: `${server.roles.cache.size - 1}`, inline: true },
            )
            .setFooter(`requested by ${message.author.tag}`)
        message.channel.send(embed);
    },
};