const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mutes people in a call!',
    expectedArgs: '@user or all',
    guildOnly: true,
    minArgs: 1,
    maxArgs: 1,
    permissions: ['MUTE_MEMBERS'],
    execute: (message, args) => {
        if (args[0] === 'all') {
            message.guild.channels.cache.array().forEach(channel => {
                if (channel.type == 'voice') {
                    channel.members.array().forEach(member => {
                        member.voice.setMute(true);
                    });
                };
            });
            return message.channel.send(`I have muted all possible members`);
        }
        let user = message.mentions.users.first();
        if (!user) { return message.reply('User not found!'); }
        let flag = true;
        message.guild.channels.cache.array().forEach(channel => {
            if (channel.type == 'voice') {
                channel.members.array().forEach(member => {
                    if (member.user == user) {
                        member.voice.setMute(true);
                        flag = false;
                    }
                });
            };
        });
        if(flag){return message.reply('User not found in the channels!')}
        message.channel.send(`I have muted <@${user.id}>`);
    },
};