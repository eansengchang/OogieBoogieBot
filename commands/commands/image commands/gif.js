const fetch = require('node-fetch');

module.exports = {
    name: 'gif',
    examples:['cute cat'],
    description: 'Shows a gif',
    expectedArgs: '{tag}',
    minArgs: 1,
    clientPermissions: ['ATTACH_FILES'],
    async execute(message, args) {
        let url = `https://g.tenor.com/v1/search?q=${args.join(' ')}&key=${process.env.TENOR_KEY}&contentfilter=low`;
        let response = await fetch(url);
        let json = await response.json();
        let results = json.results;
        let random = results[Math.floor(Math.random() * results.length)];

        message.channel.send('Via tenor:')
        message.channel.send(random.url)
    },
};