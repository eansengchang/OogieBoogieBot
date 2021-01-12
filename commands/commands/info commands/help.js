const Discord = require('discord.js');
const config = require('@root/config.json');
prefix = config.prefix;

const listCommands = require('../../list-commands')

module.exports = {
    name: 'help',
    description: 'Help with commands.',

    execute(message, args) {
        const embed = new Discord.MessageEmbed();
        if (args.length == 0) {
            embed.setColor('#0099ff')
                .setTitle('Full Description of Commands')
                .setURL('https://oogieboogiedashboard.herokuapp.com/commands')
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
            let list = makeCommandList(listCommands('commands/fun commands'))
            embed.setColor('#0099ff')
                .setTitle('Fun commands')
                .setURL('https://oogieboogiedashboard.herokuapp.com/commands')
                .setDescription('A collection of all the fun commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    {
                        name: '\u200B', value: list
                    }
                );
            message.channel.send({ embed });
        } else if (args[0] == 'info') {
            let list = makeCommandList(listCommands('commands/info commands'))
            embed.setColor('#0099ff')
                .setTitle('Info Commands')
                .setURL('https://oogieboogiedashboard.herokuapp.com/commands')
                .setDescription('A collection of all the info commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    {
                        name: '\u200B', value: list
                    }
                );
            message.channel.send({ embed });
        } else if (args[0] == 'mod') {
            let list = makeCommandList(listCommands('commands/mod commands'))
            embed.setColor('#0099ff')
                .setTitle('Mod Commands')
                .setURL('https://oogieboogiedashboard.herokuapp.com/commands')
                .setDescription('A collection of all the mod commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    {
                        name: '\u200B', value: list
                    }
                );
            message.channel.send({ embed });
        } else if (args[0] == 'nsfw') {
            let list = makeCommandList(listCommands('commands/nsfw commands'))
            embed.setColor('#0099ff')
                .setTitle('NSFW Commands')
                .setURL('https://oogieboogiedashboard.herokuapp.com/commands')
                .setDescription('A collection of all the nsfw commands and descriptions')
                .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg')
                .addFields(
                    {
                        name: '\u200B', value: list
                    }
                );
            message.channel.send({ embed });
        }
    },
};

let makeCommandList = (array) => {
    let ans = '';
    array.forEach(element => {
        ans += `\`${prefix}${element[0]} ${element[2] || ''}\` ${element[1]} \n\n`;
    });
    return ans;
}