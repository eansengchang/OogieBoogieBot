const fs = require('fs');
const Discord = require('discord.js')

module.exports = {
    name: 'record',
    description: 'records your audio',
    // expectedArgs: '{tag}',
    // minArgs: 1,
    guildOnly: true,
    async execute(message, args) {
        let member = message.mentions.members.first() || message.member;

        if (message.member.voice.channel) {
            let connection = await message.member.voice.channel.join()
            if (!connection) message.reply(`I can't seem to join the channel...`)

            message.channel.send(`Recording **${member.displayName}** | type \`stop\` to stop recording`)
            const audio = connection.receiver.createStream(member.user, { mode: 'pcm', end: 'manual' });
            const writer = audio.pipe(fs.createWriteStream(`./recorded-${member.id}.pcm`));

            writer.on('finish', () => {
                message.channel.send('Finished recording audio.')
            })

            const filter = m => {
                return (m.author.id === message.author.id && m.content == 'stop')
            }

            const collector = new Discord.MessageCollector(message.channel, filter, {
                time: 1000 * 60,
                max: 1
            })

            collector.on('end', m => {
                audio.unpipe();
                message.channel.send('Finished recording audio.')
            })

        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};