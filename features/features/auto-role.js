const timeoutSchema = require('@models/timeout-schema');
const fetch = require('node-fetch');

module.exports = async (client) => {
    //message logging
    client.on('guildMemberAdd', async (member) => {
        let timeoutCollection = timeoutSchema(member.guild.id);

        let timeout = await timeoutCollection.findOne({
            _id: 'roles'
        }, (err, object) => { })

        if (timeout && timeout.defaultRole != ''){
            member.roles.add([timeout.defaultRole])
        }
    })
}