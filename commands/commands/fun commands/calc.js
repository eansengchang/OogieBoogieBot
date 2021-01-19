let math = require('mathjs');

module.exports = {
    name: 'calc',
    description: 'Finds out how simp you are.',
    expectedArgs: '@user',
    execute(message, args) {
        let resp;
        try {
            resp = math.evaluate(args.join(' '));
        } catch {
            return message.reply('Invalid Calculation.');
        }
        message.channel.send(resp);
    },
};