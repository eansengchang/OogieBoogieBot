module.exports = {
    name: 'profile',
    description: 'Gets someone\'s profile!',
    guildOnly: true,
    execute(message, args) {
        const user = message.mentions.users.first() || message.author || message.member.user;
        const member = message.guild.members.cache.get(user.id);
        let roles = ``;
        member.roles.cache.array().forEach((item, index) => {
            roles += `<@&${item.id}> `
        })

        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`User info for ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'Usertag:', value: `${user.tag}`, inline: true },
                { name: 'Display name:', value: `${member.displayName}`, inline: true },
                { name: 'ID:', value: `${user.id}` },
                { name: 'Date created:', value: `${user.createdAt}` },
                { name: 'Joined server at:', value: `${member.joinedAt}` },
                { name: 'Roles:', value: roles },
                { name: 'Bot:', value: `${user.bot}` },
            )
            .setFooter(`requested by ${message.author.tag}`)
        message.channel.send(embed);
    },
};