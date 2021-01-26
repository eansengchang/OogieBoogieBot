const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'snipe',
    description: 'Snipe the last 10 messages',
    expectedArgs: '{num}',

    async execute(message, args) {
        const snipes = message.client.snipes.get(message.channel.id) || [];
        const msg = snipes[args[0] - 1 || 0];
        if(snipes.length === 0) return message.reply('There is nothing to snipe!')
        if (!msg) return message.reply('That is not a valid snipe...');
        const embed = new Discord.MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription(msg.content)
            .setFooter(`Date: ${msg.date} | ${args[0] || 1}/${snipes.length}`)
        if (msg.attachment) embed.setImage(msg.attachment);
        message.channel.send(embed)
    },
};