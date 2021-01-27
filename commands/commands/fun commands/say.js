module.exports = {
    name: 'say',
    description: 'Says something.',
    expectedArgs: '{phrase}',
    execute(message, args) {
        let cleanContent = message.cleanContent.slice(prefix.length).trim().split(/ +/);
        cleanContent.shift()
        if (message.mentions.everyone) {
            return message.reply('I won\'t mention everyone');
        }

        if (cleanContent.length === 0) return message.reply('please specify what to say');
        message.channel.send(cleanContent.join(' '));
    },
};