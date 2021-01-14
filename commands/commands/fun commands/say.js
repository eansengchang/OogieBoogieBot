module.exports = {
    name: 'say',
    description: 'Says something.',
    expectedArgs: '{phrase}',
    cooldown: 2,
    execute(message, args) {
        if (message.guild && (message.mentions.everyone && !message.member.hasPermission('MENTION_EVERYONE'))) {
            return message.reply('You don\'t have permissions to mention everyone');
        }

        if (args.length === 0) return message.reply('please specify what to say');
        message.channel.send(args.join(' '));
    },
};