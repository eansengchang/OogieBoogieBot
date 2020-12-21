require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = 'esc ';

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('ready', () => {
    console.log('BOT IS ONLINE AND READY');
})

client.on('message', (message) => {
    if (message.author.bot) return;

    //simple replies
    

    if (message.content === 'is harry hot') {
        message.channel.send('Harry is extremely hot');
    }

    var rey = ['REY IS INSANELY UGLY HOLY FUCK', 'Rey is a pedo', 'Rey? The failure of a human being?',
        'Rey is packing a tic-tac', 'Rey has iq of room temperature', 'Rey contains much stupid',
        'Rey put thermal paste under his cpu', 'Rey has a gay level 999', 'Rey is a big homo',
        'Pritten patil picked the wrong baby when adopting', 'Rey has big boobies',
        'Rey is a stinky', 'Rey is a curry muncher', 'Rey shoots up orphanages', 'Rey watched 300 naruto episodes in a week',
        'Rey is a weeb', 'Rey wants to fuck Tima', 'Rey got his league account banned', 'Ben chud'];
    if (message.content.substring(0, 3) === 'rey') {
        message.channel.send('<@512375511205543936> ' + rey[Math.floor(Math.random() * rey.length)]);
    }

    //prefixes
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === 'help') {
            const embed = new Discord.MessageEmbed();
            embed.setColor('#0099ff')
                .setTitle('Ching Chong Commands')
                .setDescription('A collection of all the commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .addFields(
                    { name: '\u200B', value: '**Random Commands**' },
                    { name: 'rey', value: `insults <@512375511205543936> \n \`rey\``, inline: false},
                    { name: '\u200B', value: '**Fun Commands**' },
                    { name: 'ping', value: `Pong! \n \`${PREFIX}ping\``, inline: false},
                    { name: 'say', value: `repeats a certain sentence \n \`${PREFIX}say [phrase]\``, inline: false},
                    { name: 'dice', value: `rolls a dice \n \`${PREFIX}dice\``, inline: false},
                    { name: 'length', value: `calculates your dick length\n \`${PREFIX}length\``, inline: false},
                    { name: '\u200B', value: '**Mod Commands**' },
                    { name: 'mute', value: `mutes a certain invidivual \n \`${PREFIX}mute @user\``, inline: false},
                    { name: 'unmute', value: `unmutes a certain individual \n \`${PREFIX}unmute @user\``, inline: false},
                )

            //.setFooter('Some footer text here', 'http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg');

            message.channel.send({ embed });
        }

        if (CMD_NAME === 'ping') {
            var botping = Math.round(client.ws.ping);
    
            message.channel.send(`Pong! ${botping}ms`);
        }

        if (CMD_NAME === 'say') {
            if (args.length === 0) return message.reply('please specify what to say');
            message.channel.send(args.join(' '));
        }

        if (CMD_NAME === 'dice') {
            var ans = 1 + Math.floor(Math.random()*5)
            message.channel.send(`You rolled a ${ans}!`);
        }

        if (CMD_NAME === 'length') {
            message.reply(`your dick is ${message.author.id.substring(5, 6)} inches long`);
        }

        if (CMD_NAME === 'mute') {
            if (message.guild.id != '684391250777866301') return message.channel.send('Unvailable in this server');
            if (!message.member.roles.cache.has('684396194566242376'))
                return message.channel.send('you don\'t have permissions to mute')

            if (args.length === 0) return message.reply('please specify who to mute');
            const member = message.guild.members.cache.get(args[0]
                .replace("<", "")
                .replace(">", "")
                .replace("!", "")
                .replace("@", "")
            );

            if (!member) return message.channel.send('Unable to find this member');
            member.roles.remove(member.roles.cache);
            member.roles.add(message.guild.roles.cache.get('704297468015280208'))
            message.channel.send(`muted <@${member.id}>`);
        }

        if (CMD_NAME === 'unmute') {
            if (message.guild.id != '684391250777866301') return message.channel.send('Unvailable in this server');
            if (!message.member.roles.cache.has('684396194566242376'))
                return message.channel.send('you don\'t have permissions to unmute')

            if (args.length === 0) return message.reply('please specify who unmute');
            const member = message.guild.members.cache.get(args[0]
                .replace("<", "")
                .replace(">", "")
                .replace("!", "")
                .replace("@", "")
            );

            if (!member) return message.channel.send('Unable to find this member');
            member.roles.remove(member.roles.cache);
            member.roles.add(message.guild.roles.cache.get('704254909612032050'));

            message.channel.send(`unmuted <@${member.id}>`);
        }

        
    }
})

