const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'trash',
    description: 'Shows an image of trash.',
    expectedArgs: '@user',
    async execute(message, args) {
        let user = message.mentions.users.first() || message.author || message.member.user;

        if(user.id === message.client.user.id){
            return message.reply('I AM NOT TRASH')
        }

        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(
            path.join(__dirname, '../../../images/trash.png')
        )
        let x = 0;
        let y = 0;
        ctx.drawImage(background, x, y);

        const pfp = await Canvas.loadImage(
            user.displayAvatarURL({
                format: 'png'
            })
        )
        x = canvas.width / 2 - pfp.width / 2;
        y = canvas.height / 2 - pfp.height / 2;
        ctx.drawImage(pfp, x, y);

        const attachment = new MessageAttachment(canvas.toBuffer());
        message.channel.send('', attachment);
    },
};