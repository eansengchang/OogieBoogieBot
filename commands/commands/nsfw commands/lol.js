const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'lol',
    description: 'Rule34 lol!',
    
    async execute(message, args) {
        if (!message.channel.nsfw) return message.reply('This is not an NSFW channel');
        let response = await fetch('https://meme-api.herokuapp.com/gimme/rule34lol');
        let json = await response.json();

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(json.title)
            .setURL(json.postLink)
            .setImage(json.url);

        message.channel.send(embed);
    },
};