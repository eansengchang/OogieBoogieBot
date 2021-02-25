module.exports = {
    name: 'ask',
    examples: ['should I do my homework?'],
    aliases: ['8ball'],
    description: 'Answers your question.',
    expectedArgs: '{question}',
    minArgs: 1,
    execute(message, args) {
        const replies = [
            'Yes.',
            'No.',
            'Definitely.',
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
            'There answer is complicated.',
            'Unfortunately, no.',
            'Fortunately, yes.',
        ]

        message.reply(replies[Math.floor(Math.random() * replies.length)]);
    },
};