const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'gif',
    examples:['cute cat'],
    description: 'Shows a gif',
    expectedArgs: '{tag}',
    minArgs: 1,
    clientPermissions: ['ATTACH_FILES'],
    async execute(message, args) {
        let url = `https://g.tenor.com/v1/search?q=${args.join(' ')}&key=${process.env.TENOR_KEY}&contentfilter=low`;
        let response = await fetch(url);
        let json = await response.json();
        let results = json.results;
        let random = results[Math.floor(Math.random() * results.length)];

        let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setImage(random.url)
        .setFooter('Via tenor');

    message.channel.send(embed);
    },
};