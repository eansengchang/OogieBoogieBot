module.exports = {
    name: 'pickmember',
    description: 'Randomly picks a member.',
    guildOnly: true,
    execute(message, args) {
        let member;
        do {
            member = message.guild.members.cache.random(1)[0];
        } while (member.user.bot)
        message.channel.send(`The person randomly picked is <@${member.user.id}>`);
    },
};