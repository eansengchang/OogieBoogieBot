const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Plays some audio',
    expectedArgs: '{tag}',
    minArgs: 1,
    guildOnly: true,
    async execute(message, args) {
        if (message.member.voice.channel) {

            let mention = message.mentions.users.first();
            if (mention) {
                if (!fs.existsSync(`./recorded-${mention.id}.pcm`)) return message.reply('no recording of user')

                const connection = await message.member.voice.channel.join();
                const stream = fs.createReadStream(`./recorded-${mention.id}.pcm`);

                const dispatcher = connection.play(stream, {
                    type: 'converted'
                })
            }

            else if (args[0].includes('youtu')) {
                let connection = await message.member.voice.channel.join()

                connection.play(ytdl(args[0], { filter: 'audioonly' }));

            } else if (args[0].endsWith('mp4') || args[0].endsWith('mp3') || args[0].endsWith('mov')) {
                let connection = await message.member.voice.channel.join()
                if (!connection) return message.channel.send('I can\'t seem to join the channel');
                
                connection.play(args[0])


            } else {
                message.reply('That doesn\'t seem to be a valid link')
            }

        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};