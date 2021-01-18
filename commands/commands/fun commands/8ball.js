module.exports = {
    name: '8ball',
    description: 'Answers your question.',
    expectedArgs: '{question}',
    minArgs: 1,
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
            'There answer is complicated.',
            'Unfortunately, yes.',
            'Unfortunately, no.',
            'Fortunately, yes.',
            'Fortunately, no.',
        ]

        message.reply(replies[Math.floor(Math.random() * replies.length)]);
    },
};