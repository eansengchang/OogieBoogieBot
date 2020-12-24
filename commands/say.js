module.exports = {
    name: 'say',
    description: 'Say something!',
    execute(message, args) {
        if (args.length === 0) return message.reply('please specify what to say');
        message.channel.send(args.join(' '));
    },
};