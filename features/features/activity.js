const serverActivity = require('@models/server-activity-schema');

module.exports = async (client) => {
    //message logging
    client.on('message', async (message) => {
        if(message.user.bot) return;
        if (message.guild) {
            let activityCollection = serverActivity(message.guild);

            let activity = await activityCollection.findOne({
                _id: message.author.id
            }, (err, member) => {
                if (err) console.error(err)
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
                        .catch(err => console.error(err));
                }
            })

            if (!activity) {
                activity = await activityCollection.findOne({
                    _id: message.author.id
                });
            }

            await activity.updateOne({
                messages: activity.messages + 1
            });

        }
    })

    //voice logging
    client.on('voiceStateUpdate', async (state1, state2) => {
        if (state1.member.user.bot) return;

        let activityCollection = serverActivity(state1.guild);
        let activity = await activityCollection.findOne({
            _id: state1.member.user.id
        }, (err, member) => {
            if (err) console.error(err)
            if (!member) {
                const newMember = new activityCollection({
                    _id: state1.member.id,
                    userTag: state1.member.user.tag,
                    lastUpdate: ``,
                    messages: 0,
                    voice: 0,
                    isVoice: false,
                    voiceJoinedStamp: ``
                });

                newMember.save()
                    .catch(err => console.error(err));
            }
        });

        if (!activity) {
            activity = await activityCollection.findOne({
                _id: state1.member.id
            });
        }

        //connects to channel
        if (state2.channel && (!state1.channel || (state2.guild.afkChannelID && state1.channelID == state2.guild.afkChannelID))) {
            //if it directly connected to afk channel, return
            if (state2.channelID == state2.guild.afkChannelID) return;
            client.guilds.cache.get('616347460679368731').channels.cache.get('793229646824734720').send(`**${state2.member.user.tag}** joined in \`${state2.guild.name}\``).then(async message => {
                if (activity.lastUpdate === ``) {
                    await activity.updateOne({
                        lastUpdate: message.createdTimestamp,
                    });
                }

                await activity.updateOne({
                    voiceJoinedStamp: message.createdTimestamp,
                    isVoice: true
                });
                console.log(`${activity.userTag} has joined the call`);
                //console.log(state2.guild.afkChannelID, state1.channelID, state2.guild.afkChannelID)
            });
        }

        //disconnects from a channel
        if (state1.channel && (!state2.channel || (state1.guild.afkChannelID && state2.channelID == state1.guild.afkChannelID))) {
            //if it directly disconnected from afk channel, return
            if (state1.channelID == state1.guild.afkChannelID) return;
            if (activity.isVoice == true) {
                client.guilds.cache.get('616347460679368731').channels.cache.get('793229646824734720').send(`**${state1.member.user.tag}** left in \`${state1.guild.name}\``).then(async message => {
                    let callEnd = message.createdTimestamp;
                    if (activity.lastUpdate === ``) {
                        await activity.updateOne({
                            lastUpdate: message.createdTimestamp,
                        });
                    }
                    let duration = Math.round((callEnd - activity.voiceJoinedStamp) / 1000 / 60);

                    console.log(`${activity.userTag} has left the call`);
                    console.log(`call lasted ${duration} minutes`)
                    await activity.updateOne({
                        voice: activity.voice + duration,
                        isVoice: false
                    });
                });
            }
        }
    })
}