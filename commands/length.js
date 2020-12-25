module.exports = {
    name: 'length',
    description: 'Finds your length!',
    
    execute(message, args) {
        if (args.length === 0) return message.reply(`your dick is ${message.author.id.substring(1, 2)} inches long`);
        const member = message.guild.members.cache.get(args[0]
            .replace("<", "")
            .replace(">", "")
            .replace("!", "")
            .replace("@", "")
        );
        if (!member) return message.reply(`your dick is ${message.author.id.substring(1, 2)} inches long`);
        message.channel.send(`<@${member.id}>'s dick is ${member.id.substring(1, 2)} inches long`);
    },
};