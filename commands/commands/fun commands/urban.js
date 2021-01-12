const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'urban',
    description: 'Looks it up on urban dictionary.',
    expectedArgs: '{phrase}',
    minArgs: 1,

    async execute(message, args) {
        let response = await fetch(`http://api.urbandictionary.com/v0/define?term=${args.join(' ')}`);
        let json = await response.json();
        let list = json.list;
        if(list.length===0){
            return message.reply('No definitions for this');
        }

        let res = Math.max.apply(list, list.map(function (o) { return o.thumbs_up; }))

        let top = list.find(function (o) { return o.thumbs_up == res; })

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${top.word}`)
            .setURL(top.permalink)
            .setDescription(top.definition.replace(/[\[\]]/g, ''))
            .addFields(
                {
                    name: 'Example:', value: `${top.example.replace(/[\[\]]/g, '')}`
            }
            )
            .setFooter(`${res} thumbs up`)

        message.channel.send(embed);
    },
};