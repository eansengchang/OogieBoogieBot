const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'r34',
    description: 'Searches rule 34.',
    minArgs: 1,
    expectedArgs: '{tag}',
    async execute(message, args) {
        if (!message.channel.nsfw) return message.reply('This is not an NSFW channel');

        let response = await fetch(`https://r34-json-api.herokuapp.com/posts?tags=${args.join(' ')}`);
        let json = await response.json();
        
        let random = json[Math.floor(Math.random() * json.length)]
        console.log(random)

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage(random.file_url);

        message.channel.send(embed);
    },
};