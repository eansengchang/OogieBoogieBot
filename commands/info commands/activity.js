const SQLite = require("better-sqlite3");
const sql = new SQLite('./activity.sqlite');

module.exports = {
    name: 'activity',
    description: 'See how many messages you\'ve sent',
    expectedArgs: '@user',
    guildOnly: true,
    minArgs: 0,
    maxArgs: 1,
    execute: (message, args) => {
        const user = message.mentions.users.first() || message.author || message.member.user;

        activity = message.client.getActivity.get(user.id);
        if (!activity) {
            activity = { id: `${user.id}`, userid: user.tag, messages: 0, lastUpdate: `${message.createdTimestamp}` }
            client.setActivity.run(activity);
        }
        let days = Math.round((message.createdTimestamp - activity.lastUpdate) / 1000 / 60 / 60 / 24)
        if (days === 0){
            days = 1;
        }
        let messagesPerDay = activity.messages / days;

        message.channel.send(`<@${user.id}> has sent ${activity.messages} messages in this server since ${days} days ago with an average activity of ${messagesPerDay} messages a day`);
    },
};