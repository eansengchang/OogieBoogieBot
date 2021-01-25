module.exports = {
    name: 'say',
    description: 'Says something.',
    expectedArgs: '{phrase}',
    execute(message, args) {
        if (message.mentions.everyone) {
            return message.reply('I won\'t mention everyone');
        }

        if (args.length === 0) return message.reply('please specify what to say');
        message.channel.send(args.join(' '));
    },
};