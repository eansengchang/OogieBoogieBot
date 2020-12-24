module.exports = {
    name: 'unmute',
    description: 'Unmutes a person!',
    args: true,
    execute(message, args) {
        if (message.guild.id != '684391250777866301') return message.channel.send('Unvailable in this server');
        if (!message.member.roles.cache.has('684396194566242376'))
            return message.channel.send('you don\'t have permissions to unmute');

        const user = message.mentions.users.first();
        if (user.bot) return message.channel.send('You can\'t do this to a bot');
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild

            if (member) {
                member
                    .roles.set(['704254909612032050'])
                    .then(() => {
                        message.reply(`Successfully unmuted <@${user.id}>`);
                    })
                    .catch(err => {
                        message.reply('I was unable to unmute the member');
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