module.exports = {
    name: 'gay',
    description: 'Finds out how gay you are!',
    execute(message, args) {
        let user = message.mentions.users.first() || message.author || message.member.user;
        let gay = Math.round(100*Math.random())

        if(user.id === '300232634875904000'){
            gay = 99;
        }
        message.channel.send(`<@${user.id}> is ${gay}% gay`);
    },
};