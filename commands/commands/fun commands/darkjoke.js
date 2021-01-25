const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name: 'darkjoke',
    description: 'Gives a dark joke.',
    cooldown: 2,
    
    async execute(message, args) {
        let response = await fetch('https://www.reddit.com/r/darkjokes/new.json');
        let json = await response.json();
        let darkJokes = json.data.children;
        darkJokes.shift()
        darkJokes.shift()

        let joke = darkJokes[Math.floor(Math.random()*darkJokes.length)];

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('r/darkjokes')
            .setURL(joke.data.url)
            .addField(joke.data.title, joke.data.selftext)

        message.channel.send(embed);
    },
};