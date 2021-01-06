module.exports = {
    name: 'purge',
    description: 'Bulk deletes a channel!',
    expectedArgs: '{num}',
    minArgs: 1,
    maxArgs: 1,
    guildOnly: true,
    permissions: ['MANAGE_MESSAGES'],
    execute(message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('you don\'t have the permissions for that');
        const self_member = message.guild.members.cache.get(message.client.user.id);
        if (!self_member.hasPermission('MANAGE_MESSAGES')) return message.reply('I don\'t have the permissions for that');

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