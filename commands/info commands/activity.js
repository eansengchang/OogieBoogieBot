const SQLite = require("better-sqlite3");
const sql = new SQLite('./activity.sqlite');
const Discord = require('discord.js');

module.exports = {
    name: 'activity',
    description: 'See how many messages you\'ve sent',
    expectedArgs: '@user or reset @user or top',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 2,
    execute: (message, args) => {
        //resets first mention
        if (args[0] === 'reset') {
            const user = message.mentions.users.first()
            if (!user) return message.reply('I was unable to find that user')
            activity = { id: `${message.author.id}`, usertag: message.author.tag, lastUpdate: `${message.createdTimestamp}`, messages: 0, voice: 0, isVoice: 0, voiceJoinedStamp: '' };
            message.client.setActivity.run(activity);
            return message.channel.send(`I have resetted <@${user.id}>'s activity`);

        } else if (args[0] === 'top') {
            let activityList = [];
            message.guild.members.fetch().then(members => {
                members.array().forEach(member => {
                    let activity = message.client.getActivity.get(member.user.id);
                    if (activity) {
                        activityList.push(activity);
                    }
                });

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
                            let member = message.guild.members.cache.get(activityList[i].id)
                            if (activityList[i].voice < 60) {
                                list += `\n${i + 1}. **${member.displayName}** (${voicePerDay}m/d)`;
                            }
                            else {
                                list += `\n${i + 1}. **${member.displayName}** (${Math.floor(voicePerDay / 60)}hr/d)`;
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
                            let member = message.guild.members.cache.get(activityList[i].id)
                            list += `\n${i + 1}. **${member.displayName}** (${messagesPerDay}m/d)`;
                        }
                    }
                    //prints message activity
                    let embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Top message activity`)
                        .setDescription(list);
                    message.channel.send(embed);
                }
            })

        }
        //it just gives the activity
        else {
            //either first mention or author
            const user = message.mentions.users.first() || message.author || message.member.user;

            activity = message.client.getActivity.get(user.id);
            if (!activity) {
                activity = { id: `${message.author.id}`, usertag: message.author.tag, lastUpdate: `${message.createdTimestamp}`, messages: 0, voice: 0, isVoice: 0, voiceJoinedStamp: '' };
                message.client.setActivity.run(activity);
            }
            let days = Math.floor((message.createdTimestamp - activity.lastUpdate) / 1000 / 60 / 60 / 24) + 1;
            let messagesPerDay = activity.messages / days;
            let voicePerDay = activity.voice / days;

            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`${user.username}'s activity in ${message.guild.name}`)
                .setThumbnail(user.displayAvatarURL())
                .addFields(
                    { name: 'Activity:', value: `${messagesPerDay} m/d`, inline: false },
                    { name: 'Messages:', value: `${activity.messages} messages`, inline: false },
                    { name: 'Voice:', value: `${voicePerDay} minutes per day`, inline: false },
                    { name: 'Total voice:', value: `${activity.voice} minutes`, inline: false },
                    { name: 'Days logged:', value: `${days} days`, inline: false },
                )
                .setFooter(`requested by ${message.author.tag}`)
            message.channel.send(embed);
        }
    },
};