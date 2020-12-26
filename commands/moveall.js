module.exports = {
    name: 'moveall',
    description: 'Moves everyone to a call!',
    expectedArgs: '{channel id}',
    minArgs: 1,
    maxArgs: 1,
    guildOnly: true,
    permissions: ['MOVE_MEMBERS'],
    async execute(message, args) {
        if (!message.guild.channels.cache.get(args[0]) || (message.guild.channels.cache.get(args[0]).type != 'voice')) return message.reply('That is not a valid channel');
        const channelEnd = message.guild.channels.cache.get(args[0]);

        message.guild.channels.cache.array().forEach(
            channel => { 
                if (channel.type === 'voice') {
                    channel.members.array().forEach(member => {
                        member.voice.setChannel(channelEnd);
                    });
                }
            }
        )
        message.channel.send(`I have moved all possible users to \`${channelEnd.name}\``);
    },
};