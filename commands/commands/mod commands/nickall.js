module.exports = {
    name: 'nickall',
    description: 'Nicknames everyone.',
    expectedArgs: '{name}',
    guildOnly: true,
    permissions: ['ADMINISTRATOR'],
    botPerms: ['MANAGE_NICKNAMES'],
    async execute(message, args) {
        // Get the Guild and store it under the variable "members"
        if (args.length === 0) {
            message.channel.send(`changing all possible users to default`);
        } else {
            message.channel.send(`changing all possible users to \`${args.join(' ')}\``);
        }
        message.channel.send('If its a large server, it may take a minute or so')
        let reply = await message.channel.send(`0% done`);

        let members = await message.guild.members.fetch();
        let count = 0;
        members.each(async member => {
            await member.setNickname(args.join(' ')).then(thing => {
                count++;
                if (count % 5 == 0 || count == message.guild.memberCount) {
                    let percentage = Math.round(100 * count / message.guild.memberCount);
                    reply.edit(`${percentage}% done`)
                }
            }).catch(err => {
                count++;
                if (count % 5 == 0 || count == message.guild.memberCount) {
                    let percentage = Math.round(100 * count / message.guild.memberCount);
                    reply.edit(`${percentage}% done`)
                }
            })


        })

    },
};