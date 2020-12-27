const Discord = require('discord.js');
const config = require('../config.json');
prefix = config.prefix;

module.exports = {
    name: 'help',
    description: 'Helps with commands!',
    
    execute(message, args) {
        const embed = new Discord.MessageEmbed();
        embed.setColor('#0099ff')
            .setTitle('Ching Chong Commands')
            .setDescription('A collection of all the commands and descriptions')
            .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
            .addFields(
                { name: 'Random Commands', value: `\`rey\` insults <@!512375511205543936>` }
            )
            .addFields(
                {
                    name: 'Fun Commands', value: `\n
                    \`${prefix}meme\`\t gives a meme \n
                    \`${prefix}ping\`\t pong! \n
                    \`${prefix}say\`\t repeats a certain sentence \n
                    \`${prefix}length\`\t calculates your length`
                }
            )
            .addFields(
                {
                    name: 'Info Commands', value: `\n
                    \`${prefix}profile @user\` info on a user \n
                    \`${prefix}serverinfo\` info on this server`
                }
            )
            .addFields(
                {
                    name: 'Mod Commands', value: `\n
                    \`${prefix}mute @user\` mutes a certain invidivual \n
                    \`${prefix}unmute @user\` unmutes a certain individual\n
                    \`${prefix}prune {number}\` deletes a number of messages\n
                    \`${prefix}nickall {name}\` nicknames everyone\n
                    \`${prefix}moveall {channel id}\` moves everyone to a voice channel`
                }
            )
            .addFields(
                {
                    name: 'NSFW Commands', value: `\n
                    \`${prefix}neko\` gives some nekos`
                },
            );

        message.channel.send({ embed });
    },
};