const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'quote',
    description: 'Quotes a person',
    expectedArgs: '@user {quote}',
    async execute(message, args) {
        let user;
        await message.guild.members.fetch(args[0]).then(member => {
            user = member.user || message.mentions.users.first();
        }).catch((err) => {
            user = message.mentions.users.first();
        })
        if (!user) return message.reply('You need to specify a user to quote.')

        const canvas = Canvas.createCanvas(1200 + 25 * args.join(' ').length, 400);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage(
            path.join(__dirname, '../../../images/discordbackground.png')
        )
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        const marginLeft = 25;
        const marginTop = 50;
        const pfpSize = 240;
        const fontHeight = 75;

        //the name
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${fontHeight}px uni-sans-heavy`;
        let username = user.username;
        ctx.fillText(username, marginLeft + pfpSize + 75, marginTop + fontHeight)

        //the date
        ctx.fillStyle = '#5F6368';
        ctx.font = `50px system-ui`;
        let date = `Today at 3:43 AM`;
        ctx.fillText(date, marginLeft + pfpSize + 75 + ctx.measureText(username).width * 1.7 + 30, marginTop + fontHeight)

        //the actual text
        ctx.fillStyle = '#FFFFFF';
        ctx.font = ` ${fontHeight}px uni-sans`;
        args.shift()
        let text = args.join(' ')
        ctx.fillText(text, marginLeft + pfpSize + 75, marginTop + pfpSize - 30)

        // Pick up the pen
        ctx.beginPath();
        // Start the arc to form a circle
        ctx.arc(pfpSize / 2 + marginLeft, pfpSize / 2 + marginTop, pfpSize / 2, 0, Math.PI * 2, true);
        // Put the pen down
        ctx.closePath();
        // Clip off the region you drew on
        ctx.clip();

        const pfp = await Canvas.loadImage(user.displayAvatarURL({ format: 'png', }))
        ctx.drawImage(pfp, marginLeft, marginTop, pfpSize, pfpSize);



        const attachment = new MessageAttachment(canvas.toBuffer());
        message.channel.send('', attachment);
    },
};