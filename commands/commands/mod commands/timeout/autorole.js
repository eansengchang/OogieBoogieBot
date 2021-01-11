//const SQLite = require("better-sqlite3");
//const sql = new SQLite('./activity.sqlite');
const Discord = require('discord.js');
const timeoutSchema = require('@models/timeout-schema');

module.exports = {
    name: 'autorole',
    description: 'autorole',
    expectedArgs: '{role}',
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    permissions: ['ADMINISTRATOR'],
    execute: async (message, args) => {

        let roleID = args[0].replace(/<|>|@|&/g, '')
        let role = await message.guild.roles.fetch(roleID);

        if(args[0] == 'off'){
            roleID = '';
        }
        else if (!role) {
            return message.reply('That is not a role!');
        }

        let timeoutCollection = timeoutSchema(message.guild.id);

        let timeout = await timeoutCollection.findOne({
            _id: 'roles'
        }, (err, object) => {
            if (err) console.error(err);
            //if member isn't in the database, creates one
            if (!object) {
                const newTimeout = new timeoutCollection({
                    _id: 'roles',
                    defaultRole: roleID,
                    timeoutRole: '',
                });

                newTimeout.save()
                    //                        .then(result => console.log(result))
                    .catch(err => console.error(err));
            }
        });

        if (timeout) {
            await timeout.updateOne({
                defaultRole: roleID,
            });
        }

        if(args[0] == 'off'){
            return message.channel.send(`I have successfully deleted the default role`)
        }
        message.channel.send(`I have successfully set the default role to ${role.name}`)
    },
};