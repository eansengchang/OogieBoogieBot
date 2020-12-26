const fetch = require('node-fetch');
const config = require('./config.json');
const fs = require('fs');

const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
//.replace(/[<@!>]/g, '');
const PREFIX = config.prefix;
client.login(config.token);


client.on('ready', () => {
    console.log('BOT IS ONLINE AND READY');
    client.user.setActivity(`prefix: ${config.prefix}`, { type: 'LISTENING' });

    client.guilds.cache.get('616347460679368731').channels.cache.get('616347460679368737').send('BOT IS ONLINE AND READY');
})

client.on('message', async (message) => {
    if (message.author.bot) return;
    const content = message.content.toLowerCase();
    
    //prefixes
    if (content.startsWith(PREFIX)) {
        const [commandName, ...args] = content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        //checks if the command exists
        if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName);

        let {
            name,
            description = 'Gets someone\'s profile!',
            expectedArgs,
            guildOnly = false,
            minArgs = 0,
            maxArgs = null,
            permissions = [],
            execute
        } = command

        //error traps if its meant only for server
        if (guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        //error traps for permissions
        if (permissions) {
            const selfMember = message.guild.members.cache.get(message.client.user.id);
            const member = message.member;
            let missingPerms1 = [];
            let missingPerms2 = [];
            let flag1 = false;
            let flag2 = false;
            permissions.forEach((item, index) => {
                if (!selfMember.hasPermission(item)) {
                    flag2 = true;
                    missingPerms2.push(item);
                }
                if (!member.hasPermission(item)) {
                    flag1 = true;
                    missingPerms1.push(item);
                }
            })

            if (flag1) {
                return message.reply(`You require the following permissions: \`${missingPerms1.join(' ')}\``);
            }
            else if (flag2) {
                return message.reply(`I require the following permissions: \`${missingPerms2.join(' ')}\``);
            }
        }

        //error traps if there are no args
        if (args.length< minArgs || (maxArgs !== null && maxArgs < args.length)) {
            return message.reply(`incorrect syntax! Use \`${PREFIX}${name} ${expectedArgs}\``);
        }

        try {
            execute(message, args);
        } catch (error) {
            client.guilds.cache.get('616347460679368731').channels.cache.get('616347460679368737').send(error);
            console.log(error);j
            message.reply('there was an error trying to execute that command!');
        }
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

    if(content.replace(/[<@!>]/g, '') === client.user.id){
        message.channel.send(`Type \`${PREFIX}help\` for some help`);
    }

    //random stuff
    if (message.channel.id === '715917628727885874') {
        if (Math.random() < 0.4) {
            message.channel.send('pain.');
        }
    }
})

