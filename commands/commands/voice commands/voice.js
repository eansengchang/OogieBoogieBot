const Discord = require('discord.js');
const activitySchema = require('@models/server-activity-schema');
const { CanvasRenderService } = require('chartjs-node-canvas')
const { MessageAttachment } = require('discord.js');

const width = 1200;
const height = 800;

module.exports = {
    name: 'voice',
    description: 'Top voice activity of this server',
    guildOnly: true,
    execute: async (message, args) => {
        let activityCollection = activitySchema(message.guild.id);
        //VOICE IS IN SECONDS
        let activityList = [];
        //all activities of every member in activityList
        (await activityCollection.find()).forEach(activity => {
            if (message.guild.members.cache.get(activity._id)) {
                activityList.push(activity);
            }
        })

        let voicePerDay = activityList.map(activity => {
            days = Math.floor((message.createdTimestamp - activity.lastUpdate) / 1000 / 60 / 60 / 24) + 1;
            return Math.round(10 * activity.voice / 60 / days) / 10;
        })

        //selection sorts voice
        for (let j = 0; j < 10; j++) {
            let max = j;
            for (let i = j; i < activityList.length; i++) {
                if (voicePerDay[i] > voicePerDay[max]) {
                    max = i;
                }
            }
            let temp = activityList[j];
            activityList[j] = activityList[max];
            activityList[max] = temp;

            temp = voicePerDay[j];
            voicePerDay[j] = voicePerDay[max];
            voicePerDay[max] = temp;
        }

        //grabs 10 highest activity
        let list = '';
        let users = [];
        let activities = [];
        for (let i = 0; i < 10; i++) {
            if (activityList[i]) {
                let days = Math.floor((message.createdTimestamp - activityList[i].lastUpdate) / 1000 / 60 / 60 / 24) + 1;
                let voicePerDay = Math.round(10 * activityList[i].voice / 60 / days) / 10;
                let member = message.guild.members.cache.get(activityList[i]._id)

                users.push(member.user.username);
                activities.push(Math.round(10 * voicePerDay / 60) / 10);
                if (voicePerDay < 60) {
                    list += `\n${i + 1}. **${member.displayName}** (${voicePerDay}min/d)`;
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
        showChart(message, users, activities);
    },
};

const ChartCallback = (ChartJS) => {
    ChartJS.defaults.global.defaultFontFamily = 'Lato';
    ChartJS.defaults.global.defaultFontColor = 'white';
    ChartJS.defaults.global.defaultFontSize = 18;
    ChartJS.defaults.global.legend.display = false;
    ChartJS.plugins.register({
        beforeDraw: (chartInstance) => {
            const { chart } = chartInstance;
            const { ctx } = chart;
            ctx.fillStyle = '#36393E';
            ctx.fillRect(0, 0, chart.width, chart.height);
        }
    })
}

let showChart = async (message, users, activities) => {
    //creates a graph on activity
    const canvas = new CanvasRenderService(
        width,
        height,
        ChartCallback
    )

    const configuration = {
        type: 'horizontalBar',
        data: {
            labels: users,
            datasets: [
                {
                    data: activities,
                    backgroundColor: [
                        '#f3d9dc',
                        '#fe7f2d',
                        '#fcca46',
                        '#a1c181',
                        '#619b8a',
                        '#7cea9c',
                        '#55d6be',
                        '#84dcc6',
                        '#a5ffd6',
                        '#bcf4de'
                    ],
                }
            ],
        },
        options: {
            title: {
                display: true,
                text: `Top Voice Activity of ${message.guild.name}`,
                fontSize: 34,
                padding: 30,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display: false,
                    },
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Voice (hr/day)'
                    },
                    gridLines: {
                        display: false,
                    },
                }]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 50,
                    top: 0,
                    bottom: 50
                }
            }
        }
    }

    const image = await canvas.renderToBuffer(configuration);
    const attachment = new MessageAttachment(image);
    message.channel.send(attachment)
}