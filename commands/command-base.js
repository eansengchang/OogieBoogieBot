let recentlyRan = []

module.exports = message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    let {client, guild, member} = message;
    const commandName = args.shift().toLowerCase();

    //checks if the command exists
    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    // if (message.author.id == '249148390527598592') {
    //     return message.reply('Sorry, I\'m unable to run that command for you.');
    // }

    //default properties of a command
    let {
        name,
        description,
        expectedArgs,
        guildOnly = false,
        minArgs = 0,
        maxArgs = null,
        memberPermisisons = [],
        clientpermissions = [],
        cooldown = -1,
        execute
    } = command

    //error traps if its meant only for server
    if (guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    //error traps for permissions
    if (message.channel.type !== 'dm' && memberPermisisons) {
        const member = message.member;
        let missingPerms = [];
        let flag = false;
        memberPermisisons.forEach((item, index) => {
            if (!member.hasPermission(item)) {
                flag = true;
                missingPerms.push(item);
            }
        })
        if (flag) {
            return message.reply(`You require the following permissions: \`${missingPerms.join(' ')}\``);
        }
    }
    if (clientpermissions == []) {
        clientpermissions = memberPermisisons;
    }

    //error traps for bot perms
    if (message.channel.type !== 'dm' && clientpermissions) {
        const selfMember = message.guild.member(message.client.user);
        let missingPerms = [];
        let flag = false;
        clientpermissions.forEach((item, index) => {
            if (!selfMember.hasPermission(item)) {
                flag = true;
                missingPerms.push(item);
            }
        })

        if (flag) {
            return message.reply(`I require the following permissions: \`${missingPerms.join(' ')}\``);
        }
    }

    //ensure command isn't ran too frequently
    let cooldownString = `${guild.id}-${member.id}-${name}`;
    if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
        message.reply(`You can\'t use that command so soon, cooldown is ${cooldown} secs.`)
        return
    }

    //error traps if there are no args
    if (args.length < minArgs || (maxArgs !== null && maxArgs < args.length)) {
        return message.reply(`Incorrect syntax! Use \`${prefix}${name} ${expectedArgs}\``);
    }

    
    if (cooldown > 0) {
        recentlyRan.push(cooldownString)
        setTimeout(() => {
            recentlyRan = recentlyRan.filter((string)=>{
                return string !== cooldownString
            })
        }, 1000 * cooldown);
    }

    try {
        execute(message, args);
    } catch (error) {
        console.log(`THERE WAS AN ERROR BUT WAS CATCHED: ${error}`);
        message.reply('there was an error trying to execute that command!');
    }
}