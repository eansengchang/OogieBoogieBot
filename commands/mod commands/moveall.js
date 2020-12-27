module.exports = {
    name: 'moveall',
    description: 'Moves everyone to a call!',
    expectedArgs: '{channel name}',
    minArgs: 1,
    guildOnly: true,
    permissions: ['MOVE_MEMBERS'],
    async execute(message, args) {
        let channelEnd;
        message.guild.channels.cache.array().forEach(channel => {
            if(channel.type == 'voice' && channel.name === args.join(' ')){
                channelEnd = channel;
            };
            console.log(channel.name, args.join(' '));
        });
        if(!channelEnd) return message.channel.send('This is not a valid channel name')

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