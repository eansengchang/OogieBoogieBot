module.exports = {
    name: 'test',
    description: 'specifically for testing',
    permissions: ['ADMINISTRATOR'],
    execute(message, args) {

        message.channel.messages.fetch({ limit: 100 })
            .then(messages => console.log(`Received ${messages.size} messages`))
            .catch(console.error);
    },
};