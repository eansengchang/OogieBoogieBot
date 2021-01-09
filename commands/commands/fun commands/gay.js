module.exports = {
    name: 'gay',
    description: 'Finds out how gay you are!',
    execute(message, args) {
        const gay = Math.round(100*Math.random())
        message.channel.send(`${message.member.displayName} is ${gay}% gay`);
    },
};