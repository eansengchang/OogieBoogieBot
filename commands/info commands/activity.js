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
        }
        message.channel.send(`<@${user.id}> has sent ${activity.messages} messages in this server`);
    },
};