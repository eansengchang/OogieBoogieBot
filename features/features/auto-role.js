const timeoutSchema = require('@models/timeout-schema');
const fetch = require('node-fetch');
const timeout = require('../../commands/commands/mod commands/timeout');

module.exports = async (client) => {
    //message logging
    client.on('guildMemberAdd', async (member) => {
        let timeoutCollection = timeoutSchema(message.guild.id);

        let timeout = await timeoutCollection.findOne({
            _id: 'roles'
        }, (err, object) => { })

        if (timeout){
            member.roles.add([timeout.defaultRole])
        }
    })
}