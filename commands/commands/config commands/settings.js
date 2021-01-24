const Discord = require('discord.js');
const timeoutRoleSchema = require('@models/timeout-role-schema');
const defaultRoleSchema = require('@models/default-role-schema');
const autoRoleSchema = require('@models/autorole-schema');
const vlogSchema = require('@models/vlog-schema');
const voteChannelSchema = require('@models/vote-channel-schema');

module.exports = {
    name: 'settings',
    description: 'Settings of this server.',
    guildOnly: true,
    async execute(message, args) {
        
        let { guild } = message;

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${guild.name}'s settings`)
            .setFooter(`requested by ${message.author.tag}`)
            .addField('Prefix: ', '\`e \`')

        //if theres any default roles settings
        let defaultRoleCollection = defaultRoleSchema();
        let defaultRoleObj = await defaultRoleCollection.findOne({
            _id: guild.id
        })
        
        let defaultRole = 'none';
        if (defaultRoleObj) {
            if (defaultRoleObj.defaultRole !== '') {
                defaultRole = `<@&${defaultRoleObj.defaultRole}>`;
            }
        }

        embed.addFields(
            { name: 'Default role:', value: `${defaultRole}`, inline: false },
        )

        //if theres any timeout roles settings
        let timeoutRoleCollection = timeoutRoleSchema();
        let timeoutRoleObj = await timeoutRoleCollection.findOne({
            _id: guild.id
        })
        let timeoutRole = 'none';
        if(timeoutRoleObj){
            if (timeoutRoleObj.timeoutRole !== '') {
                timeoutRole = `<@&${timeoutRoleObj.timeoutRole}>`;
            }
        }

        embed.addFields(
            { name: 'Timeout role:', value: `${timeoutRole}`, inline: false },
        )

        //if theres any auto role settings
        let autoRoleCollection = autoRoleSchema()
        let autoRoleObject = await autoRoleCollection.findOne({
            _id: guild.id
        })
        let autoRole = 'none';
        if (autoRoleObject && autoRoleObject.autoRole !== '') {
            autoRole = `<@&${autoRoleObject.autoRole}>`;
        }
        embed.addField('Auto role: ', `${autoRole}`)

        //if theres any vlog settings
        let vlogCollection = vlogSchema()
        let vlogObject = await vlogCollection.findOne({
            _id: guild.id
        })
        let vlogChannel = 'none'
        if (vlogObject && vlogObject.vlogChannelID !== '') {
            vlogChannel = `<#${vlogObject.vlogChannelID}>`;
        }
        embed.addField('Voice log channel: ', `${vlogChannel}`)

        //if theres any vote channel settings
        let voteChannelCollection = voteChannelSchema()
        let voteChannelsArray = await voteChannelCollection.find({
            serverID: guild.id
        })

        let voteChannels = 'none'
        if (voteChannelsArray.length !== 0) {
            console.log(voteChannelsArray)
            voteChannels = '';
            voteChannelsArray.forEach(channel => {
                voteChannels += `<#${channel.voteChannelID}>\n`
            });
        }
        
        embed.addField('Voting channels: ', `${voteChannels}`)

        message.channel.send(embed);
    },
};