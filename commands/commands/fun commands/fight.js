let makeDeathMessages = (name1, name2) => {
    const deathMessage = [
        `${name2} got killed killed ${name1}`,
        `${name2} got stabbed by ${name1}`,
        `${name2} got shot by ${name1}`,
        `${name2} got choked by ${name1}`,
        `${name2} got absolutely destroyed by ${name1}`,
        `${name2} tried runnning away from ${name1} but tripped and died`,
        `${name2} tripped and died`,
        `${name2} got caught off guard by ${name1}`,
        `${name2} tried to kill ${name1} but missed and died`,
        `${name2} got lost and died`,
        `${name2} got betrayed by ${name1} and died`,
    ]
    return deathMessage[Math.floor(Math.random() * deathMessage.length)];
}

module.exports = {
    name: 'fight',
    description: 'Simulates a fight!',
    expectedArgs: '@user',
    minArgs: 1,
    execute(message, args) {
        let people = message.mentions.users.array();
        if (people.length === 1) {
            people.push(message.author);
        }
        let response = '';
        while (people.length > 1) {

            let random = Math.floor(Math.random() * people.length);
            let died = people[random];
            people.splice(random, 1);
            let killer = people[Math.floor(Math.random() * people.length)];
            response += '\n' + makeDeathMessages(`**${killer.username}**`, `**${died.username}**`);
        }
        response += `\n**${people[0].username}** has won!`
        message.channel.send(response)
    },
};