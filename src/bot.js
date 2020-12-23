require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = 'esc ';

const fetch = require('node-fetch');

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('ready', () => {
    console.log('BOT IS ONLINE AND READY');
    client.guilds.cache.get('616347460679368731').channels.cache.get('616347460679368737').send('<@333177159357169664> BOT IS ONLINE AND READY');
})

client.on('message', async (message) => {
    if (!message.guild) return
    if (message.author.bot) return;
    var content = message.content.toLowerCase();
    //simple replies

    var rey = ['REY IS INSANELY UGLY HOLY FUCK', 'Rey is a pedo', 'Rey? The failure of a human being?',
        'Rey is packing a tic-tac', 'Rey has iq of room temperature', 'Rey contains much stupid',
        'Rey put thermal paste under his cpu', 'Rey has a gay level 999', 'Rey is a big homo',
        'Pritten patil picked the wrong baby when adopting', 'Rey has big boobies',
        'Rey is a stinky', 'Rey is a curry muncher', 'Rey shoots up orphanages', 'Rey watched 300 naruto episodes in a week',
        'Rey is a weeb', 'Rey wants to fuck Tima', 'Rey got his league account banned', 'Ben chud', 'Rey wants to get pegged by Joe',
        'Rey is hardstuck silver'];
    if (content.substring(0, 3) === 'rey') {
        message.channel.send('<@512375511205543936> ' + rey[Math.floor(Math.random() * rey.length)]);
    }

    //prefixes
    if (content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = content
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
                    { name: 'rey', value: `insults <@512375511205543936> \n \`rey\``, inline: false },
                )
                .addFields(
                    { name: '\u200B', value: '**Fun Commands**' },
                    { name: 'ping', value: `Pong! \n \`${PREFIX}ping\``, inline: true },
                    { name: 'say', value: `repeats a certain sentence \n \`${PREFIX}say [phrase]\``, inline: true },
                    { name: 'dice', value: `rolls a dice \n \`${PREFIX}dice\``, inline: true },
                    { name: 'length', value: `calculates your dick length\n \`${PREFIX}length\``, inline: true },
                )
                .addFields(
                    { name: '\u200B', value: '**Mod Commands**' },
                    { name: 'mute', value: `mutes a certain invidivual \n \`${PREFIX}mute @user\``, inline: false },
                    { name: 'unmute', value: `unmutes a certain individual \n \`${PREFIX}unmute @user\``, inline: false },
                )

            message.channel.send({ embed });
        }

        if (CMD_NAME == 'meme') {
            let response = await fetch('https://meme-api.herokuapp.com/gimme');
            let json = await response.json();

            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(json.title)
                .setURL(json.postLink)
                .setImage(json.url)

            message.channel.send(embed);
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
            var ans = 1 + Math.floor(Math.random() * 5)
            message.channel.send(`You rolled a ${ans}!`);
        }

        if (CMD_NAME === 'length') {
            if (args.length === 0) return message.reply(`your dick is ${message.author.id.substring(1, 2)} inches long`);
            const member = message.guild.members.cache.get(args[0]
                .replace("<", "")
                .replace(">", "")
                .replace("!", "")
                .replace("@", "")
            );
            if (!member) return message.reply(`your dick is ${message.author.id.substring(1, 2)} inches long`);
            message.channel.send(`<@${member.id}>'s dick is ${member.id.substring(1, 2)} inches long`);
        }

        if (CMD_NAME === 'mute') {
            if (message.guild.id != '684391250777866301') return message.channel.send('Unvailable in this server');
            if (!message.member.roles.cache.has('684396194566242376'))
                return message.channel.send('you don\'t have permissions to mute')

            const user = message.mentions.users.first();
            if (user.bot) return message.channel.send('You can\'t do this to a bot');
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild

                if (member) {
                    member
                        .roles.set(['704297468015280208'])
                        .then(() => {
                            message.reply(`Successfully muted <@${user.id}>`);
                        })
                        .catch(err => {
                            message.reply('I was unable to mute the member');
                            console.error(err);
                        });
                } else {
                    // The mentioned user isn't in this guild
                    message.reply("That user isn't in this server!");
                }
                // Otherwise, if no user was mentioned
            } else {
                message.reply("You didn't mention the user to mute!");
            }
        }

        if (CMD_NAME === 'unmute') {
            if (message.guild.id != '684391250777866301') return message.channel.send('Unvailable in this server');
            if (!message.member.roles.cache.has('684396194566242376'))
                return message.channel.send('you don\'t have permissions to unmute')

            const user = message.mentions.users.first();
            if (user.bot) return message.channel.send('You can\'t do this to a bot');
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild

                if (member) {
                    member
                        .roles.set(['704254909612032050'])
                        .then(() => {
                            message.reply(`Successfully unmuted <@${user.id}>`);
                        })
                        .catch(err => {
                            message.reply('I was unable to unmute the member');
                            console.error(err);
                        });
                } else {
                    // The mentioned user isn't in this guild
                    message.reply("That user isn't in this server!");
                }
                // Otherwise, if no user was mentioned
            } else {
                message.reply("You didn't mention the user to mute!");
            }
        }

        /*
                if (CMD_NAME === 'moveall') {
                    if (!message.guild.members.cache.get(message.author.id).hasPermission('MOVE_MEMBERS'))
                        return message.channel.send('you don\'t have permissions to move');
                    if (!message.guild.members.cache.get(client.user.id).hasPermission('MOVE_MEMBERS'))
                        return message.channel.send('I don\'t have permissions to move');
        
                    console.log('test');
                    if (args.length === 0) return message.reply('please say where to move');
                    const channel = message.guild.channels.cache.get(args[0]
                        .replace("<", "")
                        .replace(">", "")
                        .replace("!", "")
                        .replace("@", "")
                    );
                    console.log(channel);
                    if (!channel) return message.channel.send('Unable to find this channel');
        
                }*/
    }

    //random stuff
    if (message.channel.id === '715917628727885874') {
        if (Math.random() < 0.4) {
            message.channel.send('pain.');
        }
    }
})

