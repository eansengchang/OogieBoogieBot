const Discord = require('discord.js');
const timeoutSchema = require('@models/timeout-schema');

module.exports = {
    name: 'serverinfo',
    description: 'Gets the server info!',
    guildOnly: true,
    async execute(message, args) {
        let timeoutCollection = timeoutSchema(message.guild.id);
        let { guild } = message;
        let daysCreated = Math.round((message.createdTimestamp - guild.createdTimestamp) / 1000 / 60 / 60 / 24)

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Information on ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Servername:', value: `${guild.name}`, inline: true },
                { name: 'Owner:', value: `<@!${guild.ownerID}>`, inline: true },
                { name: 'Region:', value: `${guild.region}`, inline: true },
                { name: 'ID:', value: `${guild.id}`, inline: true },
                { name: 'Created at:', value: `\`${guild.createdAt.toDateString()}\` (${daysCreated} days ago)` },
                { name: 'Channels:', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Members:', value: `${guild.memberCount}`, inline: true },
                { name: 'Roles:', value: `${guild.roles.cache.size - 1}`, inline: true },
            )
            .setFooter(`requested by ${message.author.tag}`)

        let timeout = await timeoutCollection.findOne({
            _id: 'roles'
        })
        if (timeout) {
            embed.addFields(
                { name: 'Default role:', value: `<@&${timeout.defaultRole}>`, inline: true },
                { name: 'Timeout role:', value: `<@&${timeout.timeoutRole}>`, inline: true },
            )
        }
        message.channel.send(embed);
    },
};