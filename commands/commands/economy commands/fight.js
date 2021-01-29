const Discord = require("discord.js");
const economySchema = require('@models/economy-schema')

let makeDeathMessages = (name1, name2) => {
    const deathMessage = [
        `${name2} *got killed by* ${name1}`,
        `${name2} *got stabbed by* ${name1}`,
        `${name2} *got shot by* ${name1}`,
        `${name2} *got choked by* ${name1}`,
        `${name2} *got absolutely destroyed by* ${name1}`,
        `${name2} *tried runnning away from* ${name1} *but tripped and died*`,
        `${name2} *tripped and died*`,
        `${name2} *got caught off guard by* ${name1} *and died*`,
        `${name2} *tried to kill* ${name1} *but failed and died*`,
        `${name2} *got lost and died*`,
        `${name2} *got betrayed by* ${name1} *and died*`,
        `${name2} *was slain by* ${name1}`,
        `${name2} *accidentally shot themself*`,
        `${name2} *shot themself*`,
        `${name2} *slipped on a banana and died*`,
    ]
    return deathMessage[Math.floor(Math.random() * deathMessage.length)];
}

module.exports = {
    name: 'fight',
    description: 'Simulates a fight for money!',
    expectedArgs: '@user / everyone',
    minArgs: 1,
    guildOnly: true,
    cooldown: 60 * 3,
    async execute(message, args) {
        let people = message.mentions.members.array();

        if (args[0] === 'everyone') {
            let members = await message.guild.members.fetch();
            people = members.array();
        }

        people = people.filter(member => !member.user.bot)

        if (people.length === 0) {
            return message.reply('Invalid users.');
        }

        if (people.length === 1) {
            if (people[0].id === message.author.id) {
                return message.reply('You can\'t fight yourself')
            }
            people.push(message.member);
        }

        //shuffles people
        people = people.sort(() => 0.5 - Math.random());

        if(people.length > 20){
            message.channel.send('Too many people! Randomly picking 20 members to fight...')
            people.splice(20)
        }
        let bet = people.length - 1;

        let economyCollection = economySchema()

        let response = '';
        while (people.length > 1) {

            let random = Math.floor(Math.random() * people.length);
            let died = people[random];
            people.splice(random, 1);
            let killer = people[Math.floor(Math.random() * people.length)];
            response += '\n' + makeDeathMessages(`**${killer.displayName}**`, `**${died.displayName}**`);
        }
        response += `\n**${people[0].displayName}** has won!`;

        let embed = new Discord.MessageEmbed()
            .setTitle(`\n**${people[0].displayName}** has earned ${bet * 10} dollars!`)
            .setDescription(response);

        message.channel.send(embed);

        //adds money
        economyCollection.findOneAndUpdate(
            {
                _id: people[0].id
            },
            {
                $inc: {
                    money: bet * 10
                }
            },
            {
                upsert: true
            }
        ).exec()
    },
};