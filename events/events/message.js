const config = require('@root/config.json');
const prefix = config.prefix;
const serverActivity = require('@models/server-activity-schema');
const commandBase = require('@root/commands/command-base');

module.exports = async (client, message) => {
    let { author, content, channel } = message;
    if (author.bot) return;
    content = content.toLowerCase();

    //prefixes and commands
    if (content.startsWith(prefix)) {
        commandBase(message);
    }

    //simple replies
    //rey
    const rey = ['REY IS INSANELY UGLY HOLY FUCK', 'Rey is a pedo', 'Rey? The failure of a human being?',
        'Rey is packing a tic-tac', 'Rey has iq of room temperature', 'Rey contains much stupid',
        'Rey put thermal paste under his cpu', 'Rey has a gay level 999', 'Rey is a big homo',
        'Pritten patil picked the wrong baby when adopting', 'Rey has big boobies',
        'Rey is a stinky', 'Rey is a curry muncher', 'Rey shoots up orphanages', 'Rey watched 300 naruto episodes in a week',
        'Rey is a weeb', 'Rey wants to fuck Tima', 'Rey got his league account banned', 'Ben chud', 'Rey wants to get pegged by Joe',
        'Rey is hardstuck silver', 'Rey you eat cow'];
    if (content.substring(0, 3) === 'rey') {
        channel.send('<@512375511205543936> ' + rey[Math.floor(Math.random() * rey.length)]);
    }
    //seif
    const seif = ['SEIF IS INSANELY SUS HOLY FUCK', 'Seif is a pedo', 'Seif? The failure of a human being?',
        'Seif is packing a tic-tac', 'Seif has iq of room temperature', 'Seif contains much stupid', 
        'Rey has a gay level 999', 'Rey is a big homo', 'Seif has big boobies',
        'Seif is a stinky', 'Rey shoots up orphanages',
        'Rey wants to fuck Tima', 'Rey wants to get pegged by Joe'];
    if (content.substring(0, 4) === 'seif') {
        channel.send('<@300232634875904000> ' + seif[Math.floor(Math.random() * seif.length)]);
    }

    if (content.replace(/[<@!>]/g, '') === client.user.id) {
        channel.send(`Type \`${prefix}help\` for some help`);
    }

    //random stuff
    if (channel.id === '715917628727885874') {
        if (Math.random() < 0.4) {
            channel.send('pain.');
        }
    }
};