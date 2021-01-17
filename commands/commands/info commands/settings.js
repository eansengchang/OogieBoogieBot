const Discord = require('discord.js');
const timeoutSchema = require('@models/timeout-schema');
const autoRoleSchema = require('@models/autorole-schema');
const vlogSchema = require('@models/vlog-schema');

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
            .addField('Prefix: ', '\`e \`')

        //if theres any timeout settings
        let timeout = await timeoutCollection.findOne({
            _id: 'roles'
        })
        let defaultRole = 'none';
        let timeoutRole = 'none';
        if (timeout) {
            if (timeout.defaultRole !== '') {
                defaultRole = `<@&${timeout.defaultRole}>`;
            }
            if (timeout.timeoutRole !== '') {
                timeoutRole = `<@&${timeout.timeoutRole}>`;
            }

        }
        embed.addFields(
            { name: 'Default role:', value: `${defaultRole}`, inline: false },
            { name: 'Timeout role:', value: `${timeoutRole}`, inline: false },
        )

        //if theres any auto role settings
        let autoRoleCollection = autoRoleSchema(message.guild.id)
        let autoRoleObject = await autoRoleCollection.findOne({
            _id: 'autorole'
        })
        let autoRole = 'none';
        if (autoRoleObject && autoRoleObject.autoRole !== '') {
            autoRole = `<@&${autoRoleObject.autoRole}>`;
        }
        embed.addField('Auto role: ', `${autoRole}`)

        //if theres any vlog settings
        let vlogCollection = vlogSchema(message.guild.id)
        let vlogObject = await vlogCollection.findOne({
            _id: 'channel'
        })
        let vlogChannel = 'none'
        if (vlogObject && vlogObject.vlogChannelID !== '') {
            vlogChannel = `<#${vlogObject.vlogChannelID}>`;
        }
        embed.addField('Vlog channel: ', `${vlogChannel}`)

        message.channel.send(embed);
    },
};