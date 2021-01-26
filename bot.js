require('module-alias/register');

const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.snipes = new Discord.Collection();
client.mongoose = require('@utils/mongoose')

//.replace(/[<@!>]/g, '');

const loadCommands = require('@root/commands/load-commands');
const loadEvents = require('@root/events/load-events');
const loadFeatures = require('@root/features/load-features');

client.login(process.env.BOTTOKEN);

loadCommands(client);
loadEvents(client);
loadFeatures(client);
client.mongoose.init();
