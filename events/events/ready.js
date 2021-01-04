const config = require('@root/config.json');
const prefix = config.prefix;

module.exports = client => {
    client.user.setActivity(`prefix: ${prefix}`, { type: 'LISTENING' });
    client.guilds.cache.get('616347460679368731').channels.cache.get('616347460679368737').send('BOT IS ONLINE AND READY');

    console.log('BOT IS ONLINE AND READY');
}