const config = require('./config.json');
//const SQLite = require("better-sqlite3");
//const sql = new SQLite('./activity.sqlite');
const fs = require('fs');

const Discord = require('discord.js');
const activity = require('./commands/info commands/activity');
require('dotenv').config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mongoose = require('./utils/mongoose')

//.replace(/[<@!>]/g, '');

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Loaded event '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});

client.login(config.token);
client.mongoose.init();
