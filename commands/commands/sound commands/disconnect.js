const ytdl = require('ytdl-core');

module.exports = {
    name: 'leave',
    description: 'Leaves the voice channel',
    guildOnly: true,
    async execute(message, args) {
        if (message.guild.me.voice.channel) {
            message.guild.me.voice.channel.leave()
        }
    },
};