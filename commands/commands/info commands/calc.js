const math = require('mathjs');

module.exports = {
    name: 'calc',
    examples: ['5 + 6'],
    aliases: ['calculate'],
    description: 'Calculates some math for you.',
    minArgs: 1,
    expectedArgs: '{calculation}',
    async execute(message, args) {
        let resp;
        try {
            resp = math.evaluate(args.join(' '));
            if (toString(resp).includes('e')) throw 'Only number';
            await message.channel.send(resp);
        } catch {
            return message.reply('Invalid Calculation.');
        }

    },
};