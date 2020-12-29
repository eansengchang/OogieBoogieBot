const config = require('./config.json');
const path = require('path')
const fs = require('fs');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./activity.sqlite');

const Discord = require('discord.js');
const activity = require('./commands/info commands/activity');
require('dotenv').config();
const client = new Discord.Client();
client.commands = new Discord.Collection();

//.replace(/[<@!>]/g, '');
const prefix = config.prefix;
client.login(config.token);


client.on('ready', () => {
    console.log('BOT IS ONLINE AND READY');
    client.user.setActivity(`prefix: ${prefix}`, { type: 'LISTENING' });
    client.guilds.cache.get('616347460679368731').channels.cache.get('616347460679368737').send('BOT IS ONLINE AND READY');

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else {
                const command = require(path.join(__dirname, dir, file));
                client.commands.set(command.name, command);
            }
        }
    }
    readCommands('commands');

    client.guilds.cache.array().forEach(guild => {
        // If the table isn't there, create it and setup the database correctly.
        sql.prepare(`CREATE TABLE IF NOT EXISTS '${guild.id}' (id TEXT PRIMARY KEY, usertag TEXT, lastUpdate TEXT, messages INTEGER, voice INTEGER, isVoice INTEGER, voiceJoinedStamp TEXT);`).run();
    })
})

client.on('message', async (message) => {
    if (message.author.bot) return;
    const content = message.content.toLowerCase();


    if (message.guild) {
        client.getActivity = sql.prepare(`SELECT * FROM \`${message.guild.id}\` WHERE id = ?`);
        client.setActivity = sql.prepare(`INSERT OR REPLACE INTO \`${message.guild.id}\` VALUES (@id, @usertag, @lastUpdate, @messages, @voice, @isVoice, @voiceJoinedStamp);`);

        let activity = client.getActivity.get(message.author.id);
        if (!activity) {
            activity = { id: `${message.author.id}`, usertag: message.author.tag, lastUpdate: `${message.createdTimestamp}`, messages: 0, voice: 0, isVoice: 0, voiceJoinedStamp: '' };
        }
        activity.messages++;
        client.setActivity.run(activity);
    }

    //prefixes and commands
    if (content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        //checks if the command exists
        if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName);

        let {
            name,
            description,
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
                if (!member.hasPermission(item)) {
                    flag1 = true;
                    missingPerms1.push(item);
                }
                if (!selfMember.hasPermission(item)) {
                    flag2 = true;
                    missingPerms2.push(item);
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
        if (args.length < minArgs || (maxArgs !== null && maxArgs < args.length)) {
            return message.reply(`Incorrect syntax! Use \`${prefix}${name} ${expectedArgs}\``);
        }

        try {
            execute(message, args);
        } catch (error) {
            console.log(`THERE WAS AN ERROR BUT WAS CATCHED: ${error}`); j
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

    if (content.replace(/[<@!>]/g, '') === client.user.id) {
        message.channel.send(`Type \`${prefix}help\` for some help`);
    }

    //random stuff
    if (message.channel.id === '715917628727885874') {
        if (Math.random() < 0.4) {
            message.channel.send('pain.');
        }
    }
})

client.on('voiceStateUpdate', async (state1, state2) => {
    client.getActivity = sql.prepare(`SELECT * FROM \`${state2.guild.id}\` WHERE id = ?`);
    client.setActivity = sql.prepare(`INSERT OR REPLACE INTO \`${state2.guild.id}\` VALUES (@id, @usertag, @lastUpdate, @messages, @voice, @isVoice, @voiceJoinedStamp);`);

    let activity = client.getActivity.get(state2.member.user.id);
    if (!activity) {
        activity = { id: `${state2.member.user.id}`, usertag: state1.member.user.tag, lastUpdate: ``, messages: 0, voice: 0, isVoice: 0, voiceJoinedStamp: '' };
    }

    if (state2.channel && !state1.channel) {
        activity.isVoice = 1;
        client.guilds.cache.get('616347460679368731').channels.cache.get('793229646824734720').send(`${state2.member.user.tag} joined in ${state2.guild.name}`).then(message => {
            activity.voiceJoinedStamp = message.createdTimestamp;
            if(activity.lastUpdate === ``){activity.lastUpdate = message.createdTimestamp;}
            
            console.log(`${activity.usertag} has joined the call`);
            client.setActivity.run(activity);
        });
    }
    if (!state2.channel && state1.channel) {
        activity.isVoice = 0;
        client.guilds.cache.get('616347460679368731').channels.cache.get('793229646824734720').send(`${state2.member.user.tag} left in ${state2.guild.name}`).then(message => {
            let callEnd = message.createdTimestamp;
            if(activity.lastUpdate === ``){activity.lastUpdate = message.createdTimestamp;}
            let duration = Math.round((callEnd - activity.voiceJoinedStamp) / 1000 / 60);

            console.log(`${activity.usertag} has left the call`);
            console.log(`call lasted ${duration} minutes`)
            activity.voice += duration;
            client.setActivity.run(activity);
        });
    }

})