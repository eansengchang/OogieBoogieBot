const Discord = require('discord.js');


module.exports = {
    name: 'mimic',
    description: 'Looks it up on urban dictionary.',
    expectedArgs: '@user {phrase}',
    minArgs: 2,
    guildOnly: true,
    clientPermissions: ['MANAGE_WEBHOOKS'],
    async execute(message, args) {
        let { channel } = message;

        let member = message.mentions.members.first();
        if (!member) return message.reply('You need to specify who to mimick')

        let content = message.cleanContent.trim().split(/ +/);
        for (let i = 0; i < 2 + (member.displayName).split(' ').length; i++) {
            content.shift()
        }

        let avatarURL = member.user.displayAvatarURL()

        channel.fetchWebhooks().then(async webhookCollection => {
            let foundHook = webhookCollection.find(hook => hook.name === 'oogie-boogie-mimic');
            if (!foundHook) {
                foundHook = await channel.createWebhook('oogie-boogie-mimic', avatarURL);
            }

            foundHook.send(content.join(' '), {
                username: member.displayName,
                avatarURL: avatarURL
            })
        })
    },
};