const timeoutRoleSchema = require('@models/timeout-role-schema');

module.exports = {
    name: 'kick',
    description: 'Kicks a person.',
    expectedArgs: '@user {reason}',
    guildOnly: true,
    minArgs: 2,
    memberPermissions: ['KICK_MEMBERS'],
    clientPermissions: ['KICK_MEMBERS'],
    async execute(message, args) {

        const user = message.guild.members.cache.get(args[0]) || message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
                args.shift()
                member
                    .kick(`${message.author.tag}: ${args.join(' ')}`)
                    .then(() => {
                        // We let the message author know we were able to kick the person
                        message.reply(`Successfully kicked ${user.tag}`);
                    })
                    .catch(err => {
                        // either due to missing permissions or role hierarchy
                        message.reply('I was unable to kick the member');
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this guild!");
            }
            // Otherwise, if no user was mentioned
        } else {
            message.reply("You didn't mention the user to kick!");
        }
    },
};