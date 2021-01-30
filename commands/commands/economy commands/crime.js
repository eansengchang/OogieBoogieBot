const Discord = require("discord.js");
const economySchema = require('@models/economy-schema')

module.exports = {
    name: 'crime',
    description: 'Do some crime for some money',
    guildOnly: true,
    cooldown: 60 * 10,
    async execute(message, args) {
        const economyCollection = economySchema()

        let gained = Math.round(Math.random() * 200)

        await economyCollection.findOneAndUpdate(
            {
                _id: message.author.id
            },
            {
                $inc: { money: gained }
            },
            {
                returnNewDocument: true,   // return new doc if one is upserted
                upsert: true // insert the document if it does not exist
            })

        let embed = new Discord.MessageEmbed()
            .setTitle(`${message.member.displayName} has done some crime!`)
            .setDescription(`**${message.member.displayName}** has gained **$${gained}** after stealing!`)

        message.channel.send(embed)
    },
};