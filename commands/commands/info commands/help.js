const Discord = require('discord.js');
const config = require('@root/config.json');
prefix = config.prefix;

module.exports = {
    name: 'help',
    description: 'Helps with commands!',

    execute(message, args) {
        const embed = new Discord.MessageEmbed();
        if (args.length == 0) {
            embed.setColor('#0099ff')
                .setTitle('Full List of Commands')
                .setURL('https://chingchongdashboard.herokuapp.com/commands')
                .setDescription('Type one of them for info on a specific category')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    { name: 'Fun Commands', value: `\n\`${prefix}help fun\``, inline: true },
                    { name: 'Info Commands', value: `\n\`${prefix}help info\``, inline: true },
                    { name: 'Mod Commands', value: `\n\`${prefix}help mod\``, inline: true },
                    { name: 'NSFW Commands', value: `\n\`${prefix}help nsfw\``, inline: true },
                );
            message.channel.send({ embed });
        }
        else if (args[0] == 'fun') {
            embed.setColor('#0099ff')
                .setTitle('Fun commands')
                .setDescription('A collection of all the fun commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    {
                        name: 'Fun Commands', value: `\n
                    \`${prefix}meme\` gives a meme \n
                    \`${prefix}say\` repeats a certain sentence \n
                    \`${prefix}length\` calculates your length\n
                    \`${prefix}ask\` Answers your question\n
                    \`${prefix}gay\` Calculates your gay level`
                    }

                );
            message.channel.send({ embed });
        } else if (args[0] == 'info') {
            embed.setColor('#0099ff')
                .setTitle('Info Commands')
                .setDescription('A collection of all the info commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    {
                        name: 'Info Commands', value: `\n
                    \`${prefix}profile @user\` info on a user\n
                    \`${prefix}serverinfo\` info on this server\n
                    \`${prefix}activity\` info on your activity\n
                    \`${prefix}info\` info on the bot\n
                    \`${prefix}ping\` pong!`
                    }
                );
            message.channel.send({ embed });
        } else if (args[0] == 'mod') {
            embed.setColor('#0099ff')
                .setTitle('Mod Commands')
                .setDescription('A collection of all the mod commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    {
                        name: 'Mod Commands', value: `\n
                    \`${prefix}timeout @user\` timeouts a certain invidivual \n
                    \`${prefix}untimeout @user\` untimeouts a certain individual\n
                    \`${prefix}purge {number}\` deletes a number of messages\n
                    \`${prefix}nickall {name}\` nicknames everyone\n
                    \`${prefix}moveall {channel name}\` moves everyone to a voice channel\n
                    \`${prefix}mute @user\` or \`${prefix}mute all\` mutes a member or everyone\n
                    \`${prefix}unmute @user\` or \`${prefix}unmute all\` unmutes a member or everyone\n
                    \`${prefix}deafen @user\` or \`${prefix}deafen all\` deafens a member or everyone\n
                    \`${prefix}undeafen @user\` or \`${prefix}undeafen all\` undeafens a member or everyone\n
                    \`${prefix}disconnect @user\` or \`${prefix}disconnect all\` disonnects a member or everyone`
                    }
                );
            message.channel.send({ embed });
        } else if (args[0] == 'nsfw') {
            embed.setColor('#0099ff')
                .setTitle('NSFW Commands')
                .setDescription('A collection of all the nsfw commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    {
                        name: 'NSFW Commands', value: `\n
                    \`${prefix}neko\` gives some nekos\n
                    \`${prefix}lol\` rule34 lol\n
                    \`${prefix}hentaig\` hentai gifs\n
                    \`${prefix}solo\` solo pics\n
                    \`${prefix}solog\` solo gifs`
                    },
                );
            message.channel.send({ embed });
        }
    },
};