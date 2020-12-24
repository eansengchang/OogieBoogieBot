module.exports = {
    name: 'nickall',
    guildOnly: true,
    permissions: ['MANAGE_NICKNAMES'],
    description: 'Nicknames everyone!',
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
        message.channel.send('I have changed the nickname of all possible users')
    },
};