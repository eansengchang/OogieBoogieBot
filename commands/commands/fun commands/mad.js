module.exports = {
    name: 'mad',
    description: 'Finds out how mad you are.',
    expectedArgs: '@user',
    execute(message, args) {
        let user = message.mentions.users.first() || message.author || message.member.user;
        let mad = Math.round(100*Math.random())
        message.channel.send(`<@${user.id}> is ${mad}% mad`);
    },
};