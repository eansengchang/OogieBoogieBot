const config = require('@root/config.json');
const Discord = require('discord.js');

module.exports = async (client, guild) => {

    let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Left ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Servername:', value: `${guild.name}`, inline: true },
                { name: 'Owner:', value: `<@!${guild.ownerID}>`, inline: true },
                { name: 'Region:', value: `${guild.region}`, inline: true },
                { name: 'ID:', value: `${guild.id}`, inline: true },
                { name: 'Created at:', value: `\`${guild.createdAt.toDateString()}\``},
                { name: 'Channels:', value: `${guild.channels.cache.size}`, inline: true },
                { name: 'Members:', value: `${guild.memberCount}`, inline: true },
                { name: 'Roles:', value: `${guild.roles.cache.size - 1}`, inline: true },
                { name: 'Total number of guilds:', value: `${client.guilds.cache.size}`, inline: true },
            )

    let logGuild = await client.guilds.fetch('684391250777866301')
    logGuild.channels.cache.get('801016710345785344').send(embed);
}