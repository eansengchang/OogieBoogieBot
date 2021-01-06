require('module-alias/register');

const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mongoose = require('@utils/mongoose')

//.replace(/[<@!>]/g, '');

const loadCommands = require('@root/commands/load-commands');
loadCommands(client);

const loadEvents = require('@root/events/load-events');
loadEvents(client);

const loadFeatures = require('@root/features/load-features');
loadFeatures(client);

client.login(process.env.BOTTOKEN);
client.mongoose.init();

//require('./dashboard/server');