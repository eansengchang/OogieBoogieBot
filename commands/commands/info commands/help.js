const Discord = require('discord.js');
const config = require('@root/config.json');
prefix = config.prefix;

const listCommands = require('../../list-commands')
const categoryNames = ['fun', 'info', 'mod', 'voice', 'config', 'image', 'game', 'economy', 'nsfw'];

module.exports = {
    name: 'help',
    description: 'Help with commands.',

    execute(message, args) {
        const embed = new Discord.MessageEmbed().setColor('#0099ff')
            .setURL('https://oogieboogiedashboard.herokuapp.com/commands')
            .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg');

        let allCommands = true;
        categoryNames.forEach(category => {
            if (args[0] === category) {
                allCommands = false;
                let list = makeCommandList(listCommands(`commands/${category} commands`))
                embed.setColor('#0099ff')
                    .setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} commands`)
                    .setDescription(`A collection of all the ${category} commands and descriptions`)
                    .addFields(
                        {
                            name: '\u200B', value: list
                        }
                    );

                return message.channel.send({ embed });
            }
        })

        if (allCommands) {
            embed.setTitle('Full Description of Commands')
                .setDescription('[Help Server](https://discord.com/invite/ph5DVfFmeX) | [Website](https://oogieboogiedashboard.herokuapp.com/)')

            categoryNames.forEach(category=>{
                embed.addField(
                    `${category.charAt(0).toUpperCase() + category.slice(1)} commands`,
                    `\n\`${prefix}help ${category}\``,
                    true,
                )
            })

            message.channel.send({ embed });
        }
    },
};

let makeCommandList = (array) => {
    let ans = '';
    array.forEach(command => {
        ans += `\`${prefix}${command.name} ${command.expectedArgs || ''}\` ${command.description} \n\n`;
    });
    return ans;
}