const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Plays some audio',
    expectedArgs: '{tag}',
    minArgs: 1,
    guildOnly: true,
    async execute(message, args) {
        if (message.member.voice.channel) {
            let connection;
            if (args[0].includes('youtu')) {
                message.member.voice.channel.join().then(connection => {
                    connection.play(ytdl(args[0], { filter: 'audioonly' }));
                }).catch(err => {
                    message.channel.send('I can\'t seem to join the channel');
                });

            } else if (args[0].endsWith('mp4') || args[0].endsWith('mp3')) {
                message.member.voice.channel.join().then(connection => {
                    connection.play(args[0])
                }).catch(err => {
                    message.channel.send('I can\'t seem to join the channel');
                });

            } else {
                message.reply('That doesn\'t seem to be a valid link')
            }

        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};