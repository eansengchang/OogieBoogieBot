const Discord = require("discord.js");
const economySchema = require('@models/economy-schema')

module.exports = {
    name: 'coinflip',
    aliases: ['gamble'],
    description: 'Flips a coin for some money',
    expectedArgs: '{ammount} / all',
    guildOnly: true,
    minArgs: 1,
    async execute(message, args) {
        const economyCollection = economySchema()

        let obj = await economyCollection.findOneAndUpdate(
            {
                _id: message.author.id
            },
            {
                $inc: { money: 0 }
            },
            {
                returnNewDocument: true,   // return new doc if one is upserted
                upsert: true // insert the document if it does not exist
            })

        let ammount = parseInt(args[0]);

        //if wanna gamble all
        if(args[0] === 'all') ammount = obj.money    

        if (isNaN(ammount) || ammount < 0) return message.reply('That is not a valid ammount');

        if (obj && ammount > obj.money) return message.reply('You don\' have the money for this!')

        let embed = new Discord.MessageEmbed()

        if (Math.random() > 0.5) {
            await obj.updateOne({
                money: obj.money + ammount
            });

            embed
                .setTitle(`Heads!`)
                .setDescription(`**${message.member.displayName}** has gained **$${ammount}**!`)
        } else {
            await obj.updateOne({
                money: obj.money - ammount
            });

            embed
                .setTitle(`Tails!`)
                .setDescription(`**${message.member.displayName}** has lost **$${ammount}**!`)
        }




        message.channel.send(embed)
    },
};