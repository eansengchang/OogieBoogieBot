module.exports = {
    name: 'timeout',
    description: 'Timeouts a person!',
    expectedArgs: '@user',
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    permissions: ['MUTE_MEMBERS'],
    execute(message, args) {
        if (message.guild.id != '684391250777866301') return message.channel.send('Unvailable in this server');

        const user = message.mentions.users.first();
        if (user.bot) return message.channel.send('You can\'t do this to a bot');
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild

            if (member) {
                if(member.roles.highest.position >= message.member.roles.highest.position){
                    return message.reply('Unable to timeout someone with an equal or higher role than you');
                }
                

                member
                    .roles.set(['704297468015280208'])
                    .then(() => {
                        message.reply(`Successfully muted <@${user.id}>`);
                    })
                    .catch(err => {
                        message.reply('I was unable to mute the member');
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this server!");
            }
            // Otherwise, if no user was mentioned
        } else {
            message.reply("You didn't mention the user to mute!");
        }
    },
};