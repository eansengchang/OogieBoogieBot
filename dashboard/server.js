const express = require('express');
const app = express()
const Discord = require('discord.js');
require('dotenv').config();

require('module-alias/register');

const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

const countCommands = require('../commands/count-commands')
const listCommands = require('../commands/list-commands')

app.use(express.static(`${__dirname}/assets`));
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/img', express.static(__dirname + '/img'))
app.set('views', __dirname + '/views');

app.set('view engine', 'pug');

app.get('/', (req, res) => {

    let channels = 0;
    let serverMembers = 0;
    client.guilds.cache.array().forEach(guild => {
        channels += guild.channels.cache.size;
        serverMembers += guild.members.cache.size;
    });
    const numCommands = countCommands();

    res.render('index', {
        servers: client.guilds.cache.size,
        channels: channels,
        members: serverMembers,
        commands: numCommands,
    })
});

app.get('/commands', (req, res) => {
    let funCommands = listCommands('commands/fun commands')
    let infoCommands = listCommands('commands/info commands')
    let modCommands = listCommands('commands/mod commands')
    let nsfwCommands = listCommands('commands/nsfw commands')

    res.render('commands', {
        funCommands: funCommands,
        infoCommands: infoCommands,
        modCommands: modCommands,
        nsfwCommands: nsfwCommands
    })
});

app.get('/invite', (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=789960873203990598&permissions=0&scope=bot');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is live on port ${port}\n`))