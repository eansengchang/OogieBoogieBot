module.exports = {
    name: '8ball',
    description: 'Ask a question!',
    execute(message, args) {
        const replies = [
            'Yes.',
            'No.',
            'Perhaps.',
            'Maybe.',
            'If you believe hard enough...',
            'Most likely.',
            'That is quite unlikely.',
            'My sources agree with you.',
            'My sources disagree with you.',
            'There is still hope for that.',
            'That is not possible.',
            'That is almost certaintly true.',
            'Without a doubt.',
            'Better not tell you now.',
            'It is best for you to not know',
            'There answer is complicated',
        ]

        message.channel.send(replies[Math.floor(Math.random() * replies.length)]);
    },
};