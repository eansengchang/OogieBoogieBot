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

    // client.guilds.cache.array().forEach(guild => {
    //     // If the table isn't there, create it and setup the database correctly.
    //     let serverCollection = serverActivity(guild);
    //     server = new serverCollection({
    //         _id: 'test',
    //         userTag: 'test',
    //         lastUpdate: 'test',
    //         messages: 3,
    //         voice: 3,
    //         isVoice: false,
    //         voiceJoinedStamp: 'test'
    //     });
    
    //     server.save()
    //     //.then(result => console.log(result))
    //     .catch(err => console.error(err));
    // })


    console.log('BOT IS ONLINE AND READY');
}