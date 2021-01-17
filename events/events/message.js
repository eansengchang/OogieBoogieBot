const config = require('@root/config.json');
const prefix = config.prefix;
const commandBase = require('@root/commands/command-base');

module.exports = async (client, message) => {
    let { author, content, channel } = message;

    if (author.bot) return;
    content = content.toLowerCase();

    if(author.id==='414366502540804116'){
        return message.reply('I have been programmed to ignore you, outplayed.')
    }

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
        'Seif is packing a tic-tac', 'Seif has big boobies', 'Seif is a stinky', 'Seif shoots up orphanages',
        'Seif wants to fuck Tima', 'Seif wants to get pegged by James Charles', 'Seif\'s broke the record for most thicc athelete in the world with his 4Km run in 15 mins',
        'Seif is so homophobic that even joe wouldn\'t allow the tap', 'seif had krishna\'s babies'];


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