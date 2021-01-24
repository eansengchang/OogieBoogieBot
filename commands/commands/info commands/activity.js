const Discord = require('discord.js');
const activitySchema = require('@models/server-activity-schema');
const { CanvasRenderService } = require('chartjs-node-canvas')
const { MessageAttachment } = require('discord.js');

const width = 1200;
const height = 800;

module.exports = {
    name: 'activity',
    description: 'See how many messages you\'ve sent, or the top activity of the server',
    expectedArgs: '@user or top',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 2,
    execute: async (message, args) => {
        let activityCollection = activitySchema(message.guild.id);
        //VOICE IS IN SECONDS
        //activity top
        if (args[0] === 'top') {
            let activityList = [];
            //all activities of every member in activityList
            (await activityCollection.find()).forEach(activity => {
                if (message.guild.members.cache.get(activity._id)) {
                    activityList.push(activity);
                }
            })

            let messagesPerDay = activityList.map(activity => {
                days = Math.floor((message.createdTimestamp - activity.lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                return Math.round(10 * activity.messages / days) / 10;
            })
            //selection sorts messages
            for (let j = 0; j < 10; j++) {
                let max = j;
                for (let i = j; i < activityList.length; i++) {
                    if (messagesPerDay[i] > messagesPerDay[max]) {
                        max = i;
                    }
                }
                let temp = activityList[j];
                activityList[j] = activityList[max];
                activityList[max] = temp;

                temp = messagesPerDay[j];
                messagesPerDay[j] = messagesPerDay[max];
                messagesPerDay[max] = temp;
            }

            //grabs 10 highest activity
            let list = '';
            let users = [];
            let activities = [];
            for (let i = 0; i < 10; i++) {
                if (activityList[i]) {
                    let days = Math.floor((message.createdTimestamp - activityList[i].lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                    let messagesPerDay = Math.round(10 * activityList[i].messages / days) / 10;
                    await message.guild.members.fetch(`${activityList[i]._id}`).then(member => {
                        users.push(member.user.username);
                        activities.push(messagesPerDay);
                        list += `\n${i + 1}. **${member.displayName}** (${messagesPerDay}m/d)`;
                    }).catch(err => {
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
            showBarChart(message, users, activities, 'Message Activity Per Day');

        }

        //it just gives the activity
        else {
            let user;
            //either first mention or author
            await message.guild.members.fetch(args[0]).then(member => {
                user = member.user || message.mentions.users.first() || message.author || message.member.user;
            }).catch(() => {
                user = message.mentions.users.first() || message.author || message.member.user;
            })

            let activity = await activityCollection.findOne({
                _id: user.id
            }, async (err, member) => {
                if (err) console.error(err);
                //if member isn't in the database, creates one
                if (!member) {
                    const newMember = new activityCollection({
                        _id: message.author.id,
                        userTag: message.author.tag,
                        lastUpdate: message.createdTimestamp,
                        messages: 1,
                        voice: 0,
                        isVoice: false,
                        voiceJoinedStamp: message.createdTimestamp
                    });

                    await newMember.save()
                        //                        .then(result => console.log(result))
                        .catch(err => console.error(err));

                    return showActivity(newMember, message, user)
                }
            });

            if (!activity) {
                activity = await activityCollection.findOne({
                    _id: state1.member.id
                });
            }

            showActivity(activity, message, user);
        }
    },
};

const ChartCallback = (ChartJS) => {
    ChartJS.defaults.global.defaultFontFamily = 'Lato';
    ChartJS.defaults.global.defaultFontColor = 'black';
    ChartJS.defaults.global.defaultFontSize = 18;
    ChartJS.plugins.register({
        beforeDraw: (chartInstance) => {
            const { chart } = chartInstance;
            const { ctx } = chart;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, chart.width, chart.height);
        }
    })
}

let showBarChart = async (message, users, activities, label) => {
    //creates a graph on activity
    const canvas = new CanvasRenderService(
        width,
        height,
        ChartCallback
    )

    const configuration = {
        type: 'bar',
        data: {
            labels: users,
            datasets: [
                {
                    label: label,
                    data: activities,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 126, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 126, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 1,
                    borderColor: '#777'
                }
            ],
        },
        options: {
            title: {
                display: true,
                text: `Top Activity of ${message.guild.name}`,
                fontSize: 25,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    }

    const image = await canvas.renderToBuffer(configuration);
    const attachment = new MessageAttachment(image);
    message.channel.send(attachment)
}

let showActivity = (activity, message, user) => {
    let days = Math.floor((message.createdTimestamp - activity.lastUpdate) / 1000 / 60 / 60 / 24) + 1;
    let messagesPerDay = Math.floor(10 * activity.messages / days) / 10;
    let voicePerDay = activity.voice / 60 / days;

    let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${user.username}'s activity in ${message.guild.name}`)
        .setThumbnail(user.displayAvatarURL())
        .addFields(
            { name: 'Activity:', value: `${messagesPerDay} m/d`, inline: false },
            { name: 'Total messages:', value: `${activity.messages} messages`, inline: false }
        )

    if (voicePerDay < 60) {
        embed.addFields({ name: 'Voice:', value: `${Math.round(10 * voicePerDay) / 10} min/day`, inline: false })
    } else {
        embed.addFields({ name: 'Voice:', value: `${Math.round(10 * voicePerDay / 60) / 10} hr/day`, inline: false })
    }

    if (activity.voice / 60 < 60) {
        embed.addFields({ name: 'Total voice:', value: `${Math.floor(activity.voice / 60)} minutes`, inline: false })
    } else {
        embed.addFields({ name: 'Total voice:', value: `${Math.round(10 * activity.voice / 60 / 60) / 10} hours`, inline: false })
    }

    embed.addFields({
        name: 'Days logged:', value: `${days} days`, inline: false
    })
        .setFooter(`requested by ${message.author.tag}`);

    //if hes in a call, sends the length of the call
    if (activity.isVoice) {
        console.log(activity)
        let time = Math.floor((Date.now() - activity.voiceJoinedStamp) / 1000);
        let text;

        if (time < 60) text = `${time}s`;
        else if (time / 60 < 60) text = (`${Math.floor(time / 60)}m${Math.floor(time % 60)}s`);
        else text = (`${Math.floor(time / 60 / 60)}hr${Math.floor((time / 60) % 60)}m`);

        embed.addField('In voice for:', `${text}`);
    }

    message.channel.send(embed);
}

