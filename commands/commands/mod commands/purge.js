module.exports = {
    name: 'purge',
    description: 'Bulk deletes a channel.',
    expectedArgs: '{num}',
    minArgs: 1,
    maxArgs: 1,
    guildOnly: true,
    memberPermisisons: ['MANAGE_MESSAGES'],
    clientpermissions: ['MANAGE_MESSAGES'],
    execute(message, args) {
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount < 2 || amount > 100) {
            return message.reply('you need to input a number between 2 and 100.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            message.channel.send('There was an error while pruning these messages');
            console.error(err);
        });
    },
};