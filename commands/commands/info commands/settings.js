const Discord = require('discord.js');
const timeoutSchema = require('@models/timeout-schema');

module.exports = {
    name: 'settings',
    description: 'Settings of this server.',
    guildOnly: true,
    async execute(message, args) {
        let timeoutCollection = timeoutSchema(message.guild.id);
        let { guild } = message;

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guild.name}'s settings`)
            .setFooter(`requested by ${message.author.tag}`)

        let timeout = await timeoutCollection.findOne({
            _id: 'roles'
        })
        if (timeout) {
            let defaultRole = 'none';
            if (timeout.defaultRole !== '') {
                defaultRole = `<@&${timeout.defaultRole}>`;
            }

            embed.addFields(
                { name: 'Default role:', value: `${defaultRole}`, inline: false },
                { name: 'Timeout role:', value: `<@&${timeout.timeoutRole}>`, inline: false },
            )
        }
        message.channel.send(embed);
    },
};