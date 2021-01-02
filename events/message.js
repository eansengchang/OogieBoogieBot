const config = require('../config.json');
const prefix = config.prefix;
const serverActivity = require('../models/server-activity-schema');

module.exports = async (client, message) => {
    if (message.author.bot) return;
    const content = message.content.toLowerCase();

    //activity logging part
    if (message.guild) {

        let activityCollection = serverActivity(message.guild);

        let activity = await activityCollection.findOne({
            _id: message.author.id
        }, (err, member) => {
            if (err) console.error(err)
            if (!member) {
                const newMember = new activityCollection({
                    _id: message.author.id,
                    userTag: message.author.tag,
                    lastUpdate: message.createdTimestamp,
                    messages: 0,
                    voice: 0,
                    isVoice: false,
                    voiceJoinedStamp: message.createdTimestamp
                });

                newMember.save()
                    .catch(err => console.error(err));
            }
        });

        if (!activity) {
            activity = await activityCollection.findOne({
                _id: message.author.id
            });
        }

        await activity.updateOne({
            messages: activity.messages + 1
        });

    }

    //prefixes and commands
    if (content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        //checks if the command exists
        if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName);

        //default properties of a command
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
            console.log(`THERE WAS AN ERROR BUT WAS CATCHED: ${error}`);
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
};