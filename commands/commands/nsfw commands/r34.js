const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'r34',
    description: 'Searches rule 34.',
    minArgs: 1,
    expectedArgs: '{tag}',
    async execute(message, args) {
        if (!message.channel.nsfw) return message.reply('This is not an NSFW channel');

        let response = await fetch(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${args.join(' ')}`);
        let text = await response.text();
        let result = text.split('"').filter(element => {
            return (element.startsWith('wimg', 8) || element.startsWith('img', 8)) && (element.endsWith('jpeg') || element.endsWith('png'));
        })

        if (result.length === 0){
            return message.reply('No searches found...')
        }

        let pick = result[Math.floor(Math.random() * result.length)];

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage(pick);

        message.channel.send(embed);
    },
};