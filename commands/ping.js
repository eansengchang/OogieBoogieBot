module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message, args) {
        let botping = Math.round(message.client.ws.ping);

        message.channel.send(`Pong! ${botping}ms`);
    },
};