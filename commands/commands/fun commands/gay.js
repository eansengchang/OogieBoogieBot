module.exports = {
    name: 'gay',
    description: 'Finds out how gay you are!',
    execute(message, args) {
        let user = message.mentions.users.first() || message.author || message.member.user;
        let gay = Math.round(100*Math.random())

        // if(user.id === '300232634875904000'){
        //     gay = 1;
        // } else if(user.id === '249148390527598592'){
        //     gay = 101;
        // }
        message.channel.send(`<@${user.id}> is ${gay}% gay`);
    },
};