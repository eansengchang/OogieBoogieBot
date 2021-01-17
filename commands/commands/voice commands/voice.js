const Discord = require('discord.js');
const activitySchema = require('@models/server-activity-schema');
const { CanvasRenderService } = require('chartjs-node-canvas')
const { MessageAttachment } = require('discord.js');

const width = 1200;
const height = 800;

module.exports = {
    name: 'voice',
    description: 'Top voice of this server',
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
        showBarChart(message, users, activities, 'Voice Activity (Hr/Day)');
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