let math = require('mathjs');

module.exports = {
    name: 'calc',
    examples: ['5 + 6'],
    aliases: ['calculate', 'math'],
    description: 'Calculates some math for you.',
    minArgs: 1,
    expectedArgs: '{calculation}',
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