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
            if(`${resp}`.includes('function')) throw 'Only Number';
            if (!resp.re && !resp.im) return await message.channel.send(resp);
            return await message.channel.send(`${resp.re} + ${resp.im}i`)
        } catch (e) {
            return message.reply('Invalid Calculation.');
        }

    },
};