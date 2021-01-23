module.exports = {
    name: 'debug',
    description: 'specifically for testing',
    async execute(message, args) {

        if(message.author.id!== '333177159357169664') return;

        let user = message.mentions.users.first() || message.author || message.member.user;
        let ans = message.guild.member(user).permissions.toArray().join(', ').toLowerCase();
        message.channel.send(ans);
    },
};