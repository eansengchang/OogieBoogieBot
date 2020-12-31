const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'hentaig',
    description: 'Sends a hentai gif!',
    
    async execute(message, args) {
        if (!message.channel.nsfw) return message.reply('This is not an NSFW channel');

        let response = await fetch('https://nekos.life/api/v2/img/Random_hentai_gif');
        let json = await response.json();

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage(json.url);

        message.channel.send(embed);
    },
};