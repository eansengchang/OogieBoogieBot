module.exports = {
    name: 'nickall',
    description: 'Nicknames everyone!',
    expectedArgs: '{name}',
    guildOnly: true,
    permissions: ['MANAGE_NICKNAMES'],
    async execute(message, args) {
        // Get the Guild and store it under the variable "members"
        let reply;
        if (args.length === 0) {
            reply = message.channel.send(`changing all possible users to default...`);
        } else {
            reply = message.channel.send(`changing all possible users to \`${args.join(' ')}\` ...`);
        }

        message.guild.members.fetch()
            .then(async members => {
                embers.array().forEach(member => {
                    member.setNickname(args.join(' ')).catch(error => {
                        return
                    });
                })
            });
    },
};