module.exports = {
    name: 'nickall',
    description: 'Nicknames everyone!',
    expectedArgs: '{name}',
    guildOnly: true,
    permissions: ['MANAGE_NICKNAMES'],
    async execute(message, args) {
        // Get the Guild and store it under the variable "list"
        message.guild.members.fetch()
            .then(members => {
                members.array().forEach(member => {

                    member.setNickname(args.join(' ')).catch(error => {
                        return
                    });
                });
            });
        if (args.length === 0) return message.channel.send(`I have changed the nickname of all possible users to default`);
        message.channel.send(`I have changed the nickname of all possible users to \`${args.join(' ')}\``);
    },
};