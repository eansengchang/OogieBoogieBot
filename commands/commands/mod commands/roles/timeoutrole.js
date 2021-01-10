//const SQLite = require("better-sqlite3");
//const sql = new SQLite('./activity.sqlite');
const Discord = require('discord.js');
const timeoutSchema = require('@models/timeout-schema');

module.exports = {
    name: 'timeoutrole',
    description: 'timeourole',
    expectedArgs: '{role}',
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {

        let roleID = args[0].replace(/<|>|@|&/g, '')
        let role = await message.guild.roles.fetch(roleID);
        
        if(!role){
            return message.reply('That is not a role!');
        }

        let timeoutCollection = timeoutSchema(message.guild.id);

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
        message.channel.send(`I have successfully set the timeout role to ${role.name}`)
    },
};