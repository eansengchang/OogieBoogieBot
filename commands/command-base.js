module.exports = message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    client = message.client;
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