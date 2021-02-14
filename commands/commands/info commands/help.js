const Discord = require('discord.js');
const config = require('@root/config.json');
const fetch = require('node-fetch');
prefix = config.prefix;

const listCommands = require('../../list-commands')
const categoryNames = ['config', 'fun', 'info', 'stats', 'mod', 'voice', 'image', 'game', 'nsfw'];

module.exports = {
    name: 'help',
    description: 'Help with commands.',

    execute(message, args) {
        fetch('https://oogieboogiedashboard.herokuapp.com/commands');
        const embed = new Discord.MessageEmbed().setColor('#0099ff')

        let allCommands = true;
        categoryNames.forEach(category => {
            if (args[0] === category) {
                allCommands = false;
                let list = makeCommandList(listCommands(`commands/${category} commands`))
                embed
                    .setColor('#0099ff')
                    .setURL('https://oogieboogiedashboard.herokuapp.com/commands')
                    .setTitle(`${category.charAt(0).toUpperCase() + category.slice(1)} commands`)
                    .setDescription(`A collection of all the ${category} commands and descriptions`)
                    .addFields(
                        {
                            name: '\u200B', value: list
                        }
                    );

                return message.channel.send(embed);
            }
        })
        if (!allCommands) return;

        let command;
        let commandName = args[0].toLowerCase()
        message.client.commands.array().forEach(element => {
            if (commandName === element.name || (element.aliases && element.aliases.includes(commandName))) {
                command = element;
            }
        })

        if (command) {
            let {
                name,
                examples,
                description,
                expectedArgs,
                guildOnly = false,
                minArgs = 0,
                maxArgs = null,
                memberPermissions = [],
                clientPermissions = [],
                cooldown = -1,
                nsfw = false,
                execute
            } = command;

            embed.setTitle(`Info on ${commandName}`)
                .addFields(
                    {
                        name: 'Description',
                        value: description
                    },
                    {
                        name: 'Use',
                        value: `\`${prefix}${commandName} ${expectedArgs ? expectedArgs : ''}\``
                    })

            if (examples) {
                embed.addField('Examples', examples.map(x => `\`${prefix}${commandName} ${x}\``).join('\n'))
            }

            embed.addFields(
                {
                    name: 'Server Only?',
                    value: guildOnly,
                    inline: true,
                },
                {
                    name: 'Member Permissions',
                    value: memberPermissions.join(', ') ? memberPermissions.join(', ') : 'None',
                    inline: true,
                },
                {
                    name: 'Bot Permissions',
                    value: clientPermissions.join(', ') ? clientPermissions.join(', ') : 'None',
                    inline: true,
                },
                {
                    name: 'NSFW?',
                    value: nsfw,
                    inline: true,
                }
            )

            message.channel.send(embed);
            return
        }
        if (command) console.log('huh')

        embed.setTitle('Full Description of Commands')
            .setColor('#0099ff')
            .setURL('https://oogieboogiedashboard.herokuapp.com/commands')
            .setDescription('[Help Server](https://discord.com/invite/ph5DVfFmeX) | [Website](https://oogieboogiedashboard.herokuapp.com/)')
            .setThumbnail('http://www.justinmaller.com/img/projects/wallpaper/WP_Encrusted_XI-2560x1440_00000.jpg');

        categoryNames.forEach(category => {
            embed.addField(
                `${category.charAt(0).toUpperCase() + category.slice(1)} commands`,
                `\n\`${prefix}help ${category}\``,
                true,
            )
        })

        message.channel.send({ embed });

    },
};

let makeCommandList = (array) => {
    let ans = '';
    array.forEach(command => {
        ans += `\`${prefix}${command.name} ${command.expectedArgs || ''}\` ${command.description} \n\n`;
    });
    return ans;
}