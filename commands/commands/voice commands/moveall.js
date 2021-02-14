module.exports = {
    name: 'moveall',
    examples: ['#channel', '{channel id}'],
    description: 'Moves everyone to a channel.',
    expectedArgs: '{channel name}',
    minArgs: 1,
    guildOnly: true,
    memberPermissions: ['MOVE_MEMBERS'],
    clientPermissions: ['MOVE_MEMBERS'],
    async execute(message, args) {
        let channelEnd;
        message.guild.channels.cache.array().forEach(channel => {
            if(channel.type == 'voice' && channel.name === args.join(' ')){
                channelEnd = channel;
            };
            if(channel.type == 'voice' && channel.id === args.join(' ')){
                channelEnd = channel;
            };
        });

        if(!channelEnd) return message.channel.send('This is not a valid channel name')

        if(!channelEnd.permissionsFor(message.guild.me).has('MOVE_MEMBERS')) return message.reply("I don't have perms to move people to that channel")

        message.channel.send(`Moving all possible users to \`${channelEnd.name}\`...`);

        let reply = await message.channel.send(`\`moved 0 members\`...`);
        let count = 0;
        message.guild.channels.cache.each(
            channel => { 
                if (channel.type === 'voice') {
                    channel.members.each(async member => {
                        await member.voice.setChannel(channelEnd).then(()=>{
                            count ++;
                            reply.edit(`\`moved ${count} members\`...`)
                        });
                        
                    });
                }
            }
        )
    },
};