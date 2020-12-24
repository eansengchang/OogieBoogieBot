const Discord = require('discord.js');
const config = require('../ config.json');
PREFIX = config.prefix;

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
                    \`${PREFIX}meme\`\t gives a meme \n
                    \`${PREFIX}ping\`\t pong! \n
                    \`${PREFIX}say\`\t repeats a certain sentence \n
                    \`${PREFIX}length\`\t calculates your length`
                }
            )
            .addFields(
                {
                    name: 'Info Commands', value: `\n
                    \`${PREFIX}profile @user\` info on a user \n
                    \`${PREFIX}serverinfo\` info on this server`
                }
            )
            .addFields(
                {
                    name: 'Mod Commands', value: `\n
                    \`${PREFIX}mute @user\` mutes a certain invidivual \n
                    \`${PREFIX}unmute @user\` unmutes a certain individual\n
                    \`${PREFIX}prune {number}\` deletes a number of messages`
                }
            )
            .addFields(
                {
                    name: 'NSFW Commands', value: `\n
                    \`${PREFIX}neko\` gives some nekos`
                },
            );

        message.channel.send({ embed });
    },
};