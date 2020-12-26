module.exports = {
    name: 'length',
    description: 'Finds your length!',
    
    execute(message, args) {
        const user = message.mentions.users.first() || message.author || message.member.user;
        message.channel.send(`<@${user.id}>'s dick is ${member.id.substring(1, 2)} inches long`);
    },
};