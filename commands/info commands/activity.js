const SQLite = require("better-sqlite3");
const sql = new SQLite('./activity.sqlite');

module.exports = {
    name: 'activity',
    description: 'See how many messages you\'ve sent',
    guildOnly: true,
    execute: (message, args) => {
        
        activity = message.client.getActivity.get(message.author.id);
        message.reply(`You\'ve sent ${activity.messages} messages in this server`);
    },
};