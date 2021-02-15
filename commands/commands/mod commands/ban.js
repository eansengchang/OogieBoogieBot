const timeoutRoleSchema = require('@models/timeout-role-schema');

module.exports = {
    name: 'ban',
    description: 'Bans a person.',
    expectedArgs: '@user {reason}',
    guildOnly: true,
    minArgs: 1,
    memberPermissions: ['BAN_MEMBERS'],
    clientPermissions: ['BAN_MEMBERS'],
    async execute(message, args) {

        const user = message.guild.members.cache.get(args[0]) || message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            
            if (member) {
                if (member.roles.highest.position >= message.member.roles.highest.position) {
                    return message.reply('Unable to ban someone with an equal or higher role than you');
                }

                args.shift()
                member
                    .ban({
                        reason: `by ${message.author.tag}: ${args.join(' ')}`,
                    })
                    .then(() => {
                        // We let the message author know we were able to ban the person
                        message.reply(`Successfully banned ${user.tag}`);
                    })
                    .catch(err => {
                        // either due to missing permissions or role hierarchy
                        message.reply('I was unable to ban the member');
                        // Log the error
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this guild!");
            }
        } else {
            // Otherwise, if no user was mentioned
            message.reply("You didn't mention the user to ban!");
        }
    },
};