module.exports = {
    name: 'love',
    description: 'Shows how much someone is loved.',
    expectedArgs: '@user1 @user2',
    minArgs: 2,
    maxArgs: 2,
    execute(message, args) {
        let user1 = message.mentions.users.first()
        let user2 = message.mentions.users.last()
        let love = Math.round(Math.random() * 100);

        message.channel.send(`<@${user1.id}> :heart: <@${user2.id}>: ${love}%`)        
    },
};