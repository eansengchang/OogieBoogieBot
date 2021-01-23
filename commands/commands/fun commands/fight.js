let makeDeathMessages = (name1, name2) => {
    const deathMessage = [
        `${name1} has killed ${name2}`,
        `${name1} has stabbed ${name2}`,
        `${name1} has shot ${name2}`,
        `${name1} has choked ${name2}`,
        `${name2} got absolutely destroyed by ${name1}`,
        `${name2} tried runnning away from ${name1} but tripped and died`,
        `${name2} got caught off guard by ${name1}`,
        `${name2} tried to kill ${name1} but missed and died`,
        `${name2} got lost and died`,
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
        console.log(people)
        while (people.length > 1) {
            
            let random = Math.floor(Math.random() * people.length);
            let died = people[random]
            people.splice(random, 1);
            let killer = people[Math.floor(Math.random() * people.length)]
            message.channel.send(makeDeathMessages(`**${killer.username}**`, `**${died.username}**`))
        }
        message.channel.send(`**${people[0].username}** has won!`);
    },
};