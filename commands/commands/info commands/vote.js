const fetch = require('node-fetch');
const Discord = require('discord.js')

module.exports = {
    name: 'vote',
    description: 'vote for this bot!',
    async execute(message, args) {

        let topGGFetched = await fetch(`https://top.gg/api/bots/789960873203990598/check?userId=${message.author.id}`,
            { headers: { "Authorization": process.env.TOPGG_TOKEN } }
        );
        let topGGJson = await topGGFetched.json();

        let BFDFetched = await fetch(`https://botsfordiscord.com/api/bot/789960873203990598/votes`,
            {
                headers: {
                    "Authorization": process.env.BFD_TOKEN,
                    "Content-Type": 'application/json'
                }
            }
        );

        let BFDJson = await BFDFetched.json();
        console.log(BFDJson)

        let embed = new Discord.MessageEmbed().setTitle('Vote for this bot')
            .setDescription(`[Top.gg](https://top.gg/bot/789960873203990598/vote)
            Voted: ${topGGJson.voted === 1 ? '**True**' : '**False**'}
            
            [botsfordiscord.com](https://botsfordiscord.com/bot/789960873203990598/vote)
            Voted: ${BFDJson.hasVoted24.includes(message.author.id) ? '**True**' : '**False**'}
            `
            )

        

        message.channel.send(embed)
    },
};