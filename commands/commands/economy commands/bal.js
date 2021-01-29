const Discord = require("discord.js");
const economySchema = require('@models/economy-schema')

module.exports = {
    name: 'bal',
    description: 'Gets your balance',
    expectedArgs: '@user',
    guildOnly: true,
    async execute(message, args) {
        const economyCollection = economySchema()

        let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.member;
        //adds money
        let obj = await economyCollection.findOneAndUpdate(
            {
                _id: member.id
            },
            {
                $inc: {
                    money: 0
                }
            },
            {
                upsert: true
            }
        ).exec()

        let embed = new Discord.MessageEmbed()
            .setTitle(`${member.displayName}'s money`)
            .setDescription(`Bank account: **${obj.money} dollars**`)

        message.channel.send(embed)
    },
};