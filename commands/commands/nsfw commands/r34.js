const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'rule34',
    aliases: ['r34'],
    description: 'Searches rule 34.',
    minArgs: 1,
    expectedArgs: '{tag}',
    cooldown: 2,
    nsfw: true,
    async execute(message, args) {

        let response = await fetch(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${args.join('_')}`);
        let text = await response.text();
    
        let result = text.split('"').filter((element, index) => {
            return text.split('"')[index-1] === ` file_url=` && !element.endsWith('mp4');
        })

        if (result.length === 0) {
            return message.reply('No searches found...')
        }

        let pick = result[Math.floor(Math.random() * result.length)];

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setImage(pick)
            .setFooter(`Requested by ${message.author.tag}`)

        message.channel.send(embed);
    },
};