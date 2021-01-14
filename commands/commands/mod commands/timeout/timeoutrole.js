//const SQLite = require("better-sqlite3");
//const sql = new SQLite('./activity.sqlite');
const Discord = require('discord.js');
const timeoutSchema = require('@models/timeout-schema');

module.exports = {
    name: 'timeoutrole',
    description: 'The role given to timeout.',
    expectedArgs: '{role}',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 1,
    memberPermissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {
        let timeoutCollection = timeoutSchema(message.guild.id);
        let { guild } = message;

        if (args.length === 0) {
            let timeout = await timeoutCollection.findOne({
                _id: 'roles'
            })
            if (timeout) {
                let timeoutRole = 'none';
                if (timeout.timeoutRole !== '') {
                    timeoutRole = `<@&${timeout.timeoutRole}>`;
                }
                let embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${guild.name}'s timeout role`)
                    .addFields(
                        { name: 'Timeout role:', value: `${timeoutRole}`, inline: false },
                    )
                return message.channel.send(embed);
            }
        }

        let roleID = args[0].replace(/<|>|@|&/g, '')
        let role = message.guild.roles.cache.get(roleID)
        if(!role){
            role = await message.guild.roles.fetch(roleID);
        }
        if (args[0] == 'off') {
            roleID = '';
        }
        
        else if(!role){
            return message.reply('That is not a role!');
        }

        let timeout = await timeoutCollection.findOne({
            _id: 'roles'
        }, (err, object) => {
            if (err) console.error('collection not found');
        });

        if (!timeout) {
            message.reply('You first need to set up a default role before setting a timeout role')
        }

        //updates messages
        await timeout.updateOne({
            timeoutRole: roleID,
        });
        if (args[0] == 'off') {
            return message.channel.send(`I have successfully deleted the timeout role`)
        }
        message.channel.send(`I have successfully set the timeout role to ${role.name}`)
    },
};