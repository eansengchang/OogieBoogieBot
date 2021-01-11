module.exports = {
    name: 'test',
    description: 'specifically for testing',
    permissions: ['ADMINISTRATOR'],
    async execute(message, args) {
        if(message.author.id!== '333177159357169664') return;
        
    },
};