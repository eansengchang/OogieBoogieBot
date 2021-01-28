module.exports = async (client, state1, state2) => {
    let channel = state1.channel || state2.channel

    membersInCall = channel.members.array()
    console.log(membersInCall)
    if (membersInCall.length === 1 && membersInCall[0].user === client.user) {
        state1.channel.leave();
    }

}