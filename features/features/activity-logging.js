const activitySchema = require('@models/server-activity-schema');
const highestVoiceSchema = require('@models/vlog-highest-schema');
const fetch = require('node-fetch');

module.exports = async (client) => {
    //message logging
    client.on('message', async (message) => {
        if (message.author.bot) return;
        if (message.guild) {
            let activityCollection = activitySchema(message.guild.id);

            let activity = await activityCollection.findOne({
                _id: message.author.id
            }, async (err, member) => {
                if (err) console.error(err)
                //creates member if its not there
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
                        .catch(err => console.error(err));
                }
            })

            //updates messages
            if (activity) {
                await activity.updateOne({
                    messages: activity.messages + 1
                });
            }

        }
    })

    //voice logging
    client.on('voiceStateUpdate', async (state1, state2) => {
        if (state1.member.user.bot) return;

        //activity stuff
        let activityCollection = activitySchema(state1.guild.id);
        let activity = await activityCollection.findOne({
            _id: state1.member.user.id
        }, async (err, member) => {
            if (err) console.error(err)
            if (!member) {
                const newMember = new activityCollection({
                    _id: state1.member.id,
                    userTag: state1.member.user.tag,
                    lastUpdate: Date.now(),
                    messages: 0,
                    voice: 0,
                    isVoice: false,
                    voiceJoinedStamp: ``
                });

                await newMember.save()
                    .then(async newActivity => {
                        activity = await activityCollection.findOne({
                            _id: state1.member.id
                        });
                    })
                    .catch(err => console.error(err));
            }
        });

        if (!activity) {
            activity = await activityCollection.findOne({
                _id: state1.member.id
            });
            console.log(`Regetting activity: `, activity);
        }

        if (!activity) {
            console.log(`Couln't get activity...`)
            return;
        }

        //connects to channel
        if (state2.channel && (!state1.channel || (state2.guild.afkChannelID && state1.channelID == state2.guild.afkChannelID))) {
            //if it directly connected to afk channel, return
            if (state2.channelID == state2.guild.afkChannelID) return;

            if (activity.lastUpdate === ``) {
                await activity.updateOne({
                    lastUpdate: Date.now(),
                });
            }

            await activity.updateOne({
                voiceJoinedStamp: Date.now(),
                isVoice: true
            });
            //console.log(state2.guild.afkChannelID, state1.channelID, state2.guild.afkChannelID)

        }

        //disconnects from a channel
        if (state1.channel && (!state2.channel || (state1.guild.afkChannelID && state2.channelID == state1.guild.afkChannelID))) {
            //if it directly disconnected from afk channel, return
            if (state1.channelID == state1.guild.afkChannelID) return;
            if (activity.isVoice == true) {

                let callEnd = Date.now()
                if (activity.lastUpdate === ``) {
                    await activity.updateOne({
                        lastUpdate: Date.now(),
                    });
                }
                let duration = Math.floor((callEnd - activity.voiceJoinedStamp) / 1000);

                await activity.updateOne({
                    voice: activity.voice + duration,
                    isVoice: false
                });

                //highest voice
                let highestVoiceCollection = highestVoiceSchema(state1.guild.id);
                let highestVoice = await highestVoiceCollection.findOne({ _id: 'highestVoice' })

                //HIGHEST VOICE IS IN SECONDS
                if (!highestVoice || (highestVoice && highestVoice.time < duration)) {
                    highestVoiceCollection.findOneAndUpdate(
                        {
                            _id: 'highestVoice'
                        },
                        {
                            _id: 'highestVoice',
                            highestMemberID: state1.member.id,
                            time: duration,
                        },
                        {
                            upsert: true,
                        }
                    ).exec()
                }
            }
        }
    })
}