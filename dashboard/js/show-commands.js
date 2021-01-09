import fs from 'fs';
import path from 'path';

let commands = [];
console.log('ummm')
const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file));
        if (stat.isDirectory()) {
            readCommands(path.join(dir, file));
        } else if (file !== 'command-base.js' && file !== 'load-commands.js') {
            const command = require(path.join(__dirname, dir, file));
            commands.push([command.name, command]);
        }
    }
}
readCommands('../../../commands/commands');
console.log(commands)

let elem = document.createElement('li')
let elemText = document.createTextNode(commands[0][0]);
elem.appendChild(elemText)
elem.classList.add('list-group-item');

let elem2 = document.createElement('ul')
elem2.appendChild(elem)

let list = document.getElementById('commands')
list.appendChild(elem2)
