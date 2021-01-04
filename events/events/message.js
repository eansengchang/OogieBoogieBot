const config = require('@root/config.json');
const prefix = config.prefix;
const serverActivity = require('@models/server-activity-schema');
const commandBase = require('@root/commands/command-base');

module.exports = async (client, message) => {
    if (message.author.bot) return;
    const content = message.content.toLowerCase();


    //prefixes and commands
    if (content.startsWith(prefix)) {
        commandBase(message);
    }

    //simple replies

    const rey = ['REY IS INSANELY UGLY HOLY FUCK', 'Rey is a pedo', 'Rey? The failure of a human being?',
        'Rey is packing a tic-tac', 'Rey has iq of room temperature', 'Rey contains much stupid',
        'Rey put thermal paste under his cpu', 'Rey has a gay level 999', 'Rey is a big homo',
        'Pritten patil picked the wrong baby when adopting', 'Rey has big boobies',
        'Rey is a stinky', 'Rey is a curry muncher', 'Rey shoots up orphanages', 'Rey watched 300 naruto episodes in a week',
        'Rey is a weeb', 'Rey wants to fuck Tima', 'Rey got his league account banned', 'Ben chud', 'Rey wants to get pegged by Joe',
        'Rey is hardstuck silver'];
    if (content.substring(0, 3) === 'rey') {
        message.channel.send('<@512375511205543936> ' + rey[Math.floor(Math.random() * rey.length)]);
    }

    if (content.replace(/[<@!>]/g, '') === client.user.id) {
        message.channel.send(`Type \`${prefix}help\` for some help`);
    }

    //random stuff
    if (message.channel.id === '715917628727885874') {
        if (Math.random() < 0.4) {
            message.channel.send('pain.');
        }
    }
};