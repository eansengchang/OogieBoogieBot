const Discord = require('discord.js');
const serverActivity = require('@models/server-activity-schema');

module.exports = {
    name: 'activity',
    description: 'See how many messages you\'ve sent',
    expectedArgs: '@user or reset @user or top',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 2,
    execute: async (message, args) => {
        let activityCollection = serverActivity(message.guild);

        if (args[0] === 'top') {
            let activityList = [];
            (await activityCollection.find()).forEach(activity => {
                if (message.guild.members.cache.get(activity._id)) {
                    activityList.push(activity);
                }
            })

            //bubbble sorts voice
            if (args[1] === 'voice') {
                let flag = true;
                while (flag) {
                    flag = false;
                    for (let i = 0; i < activityList.length - 1; i++) {
                        let days1 = Math.floor((message.createdTimestamp - activityList[i].lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                        let voicePerDay1 = Math.round(10 * activityList[i].voice / days1) / 10;
                        let days2 = Math.floor((message.createdTimestamp - activityList[i + 1].lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                        let voicePerDay2 = Math.round(10 * activityList[i + 1].voice / days2) / 10;

                        if (voicePerDay1 < voicePerDay2) {
                            flag = true;
                            let temp = activityList[i];
                            activityList[i] = activityList[i + 1];
                            activityList[i + 1] = temp;
                        }
                    }
                }

                let list = '';
                for (let i = 0; i < 10; i++) {
                    if (activityList[i]) {
                        let days = Math.floor((message.createdTimestamp - activityList[i].lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                        let voicePerDay = Math.round(10 * activityList[i].voice / days) / 10;
                        let member = message.guild.members.cache.get(activityList[i]._id)
                        if (voicePerDay < 60) {
                            list += `\n${i + 1}. **${member.displayName}** (${voicePerDay}m/d)`;
                        }
                        else {
                            list += `\n${i + 1}. **${member.displayName}** (${Math.round(10 * voicePerDay / 60) / 10}hr/d)`;
                        }
                    }
                }
                //prints voice activity
                let embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Top voice activity`)
                    .setDescription(list);
                message.channel.send(embed);
            }
            //bubble sorts messages
            else {
                let flag = true;
                while (flag) {
                    flag = false;
                    for (let i = 0; i < activityList.length - 1; i++) {
                        let days1 = Math.floor((message.createdTimestamp - activityList[i].lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                        let messagesPerDay1 = Math.round(10 * activityList[i].messages / days1) / 10;
                        let days2 = Math.floor((message.createdTimestamp - activityList[i + 1].lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                        let messagesPerDay2 = Math.round(10 * activityList[i + 1].messages / days2) / 10;

                        if (messagesPerDay1 < messagesPerDay2) {
                            flag = true;
                            let temp = activityList[i];
                            activityList[i] = activityList[i + 1];
                            activityList[i + 1] = temp;
                        }
                    }
                }

                let list = '';
                for (let i = 0; i < 10; i++) {
                    if (activityList[i]) {
                        let days = Math.floor((message.createdTimestamp - activityList[i].lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                        let messagesPerDay = Math.round(10 * activityList[i].messages / days) / 10;
                        await message.guild.members.fetch(`${activityList[i]._id}`).then(member => {
                            list += `\n${i + 1}. **${member.displayName}** (${messagesPerDay}m/d)`;
                        }).catch(err => {
                            console.log(activityList[i])
                            console.log(err)
                        });
                    }
                }
                //prints message activity
                let embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Top message activity`)
                    .setDescription(list);
                message.channel.send(embed);
            }


        }
        //it just gives the activity
        else {
            //either first mention or author
            const user = message.mentions.users.first() || message.author || message.member.user;

            const activity = await activityCollection.findOne({
                _id: user.id
            }, (err, member) => {
                if (err) console.error(err);
                if (!member) {
                    const newMember = new activityCollection({
                        _id: message.author.id,
                        userTag: message.author.tag,
                        lastUpdate: message.createdTimestamp,
                        messages: 0,
                        voice: 0,
                        isVoice: false,
                        voiceJoinedStamp: message.createdTimestamp
                    });

                    newMember.save()
                        //                        .then(result => console.log(result))
                        .catch(err => console.error(err));

                    return showActivity(newMember, message, user)
                }
            });

            showActivity(activity, message, user);


        }
    },
};

let showActivity = (activity, message, user) => {
    let days = Math.floor((message.createdTimestamp - activity.lastUpdate) / 1000 / 60 / 60 / 24) + 1;
    let messagesPerDay = activity.messages / days;
    let voicePerDay = activity.voice / days;

    let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${user.username}'s activity in ${message.guild.name}`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            { name: 'Activity:', value: `${messagesPerDay} m/d`, inline: false },
            { name: 'Messages:', value: `${activity.messages} messages`, inline: false }
        )

    if (voicePerDay < 60) {
        embed.addFields({ name: 'Voice:', value: `${voicePerDay} min/day`, inline: false })
    } else {
        embed.addFields({ name: 'Voice:', value: `${Math.round(10 * voicePerDay / 60) / 10} hr/day`, inline: false })
    }

    if (activity.voice < 60) {
        embed.addFields({ name: 'Total voice:', value: `${activity.voice} minutes`, inline: false })
    } else {
        embed.addFields({ name: 'Total voice:', value: `${Math.round(10 * activity.voice / 60) / 10} hours`, inline: false })
    }

    embed.addFields({
        name: 'Days logged:', value: `${days} days`, inline: false
    })
        .setFooter(`requested by ${message.author.tag}`)

    message.channel.send(embed);
}

