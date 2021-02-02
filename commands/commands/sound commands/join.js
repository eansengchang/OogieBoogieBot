const ytdl = require('ytdl-core');

module.exports = {
    name: 'join',
    description: 'Joins your voice channel',
    guildOnly: true,
    async execute(message, args) {
        if (message.member.voice.channel) {
            message.member.voice.channel.join().catch(err => {
                message.channel.send('I can\'t seem to join the channel');
            });

        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};