const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'violence',
    description: 'Violence may be the answer.',
    expectedArgs: '{message}',
    minArgs: 1,
    async execute(message, args) {
        let user = message.guild.members.cache.get(args[0]) || message.mentions.users.first() || message.author || message.member.user;

        const canvas = Canvas.createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(
            path.join(__dirname, '../../../images/violence.png')
        )
        ctx.drawImage(background, 0, 0);

        //the text
        ctx.fillStyle = '#000000';
        ctx.font = `15px uni-sans-heavy`;
        ctx.fillText(args.join(' '), 290, 30)

        const pfp = await Canvas.loadImage(
            user.displayAvatarURL({
                format: 'png'
            })
        )

        const attachment = new MessageAttachment(canvas.toBuffer());
        message.channel.send('', attachment);
    },
};