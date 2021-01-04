const config = require('../config.json');
const prefix = config.prefix;
const serverActivity = require('../models/server-activity-schema');

const path = require('path')
const fs = require('fs');

module.exports = client => {
    client.user.setActivity(`prefix: ${prefix}`, { type: 'LISTENING' });
    client.guilds.cache.get('616347460679368731').channels.cache.get('616347460679368737').send('BOT IS ONLINE AND READY');
   
    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file));
            } else {
                const command = require(path.join(__dirname, dir, file));
                client.commands.set(command.name, command);
            }
        }
    }
    readCommands('../commands');

    console.log('BOT IS ONLINE AND READY');
}