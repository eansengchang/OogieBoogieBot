const Discord = require('discord.js');

const size = 9;
let totalBombs = 7;
const numberEmoji = [":white_large_square:", ":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:", ":nine:"];

function make2DArray(cols, rows) {
    var arr = new Array(cols)
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }
    return arr;
}

class Cell {
    constructor(i, j) {
        this.bomb = false;//Math.random() < 0.05;
        this.revealed = false;
        this.i = i;
        this.j = j;
        this.neighbourCount = 0;
    }

    reveal = (grid) => {
        this.revealed = true;
        if (this.neighbourCount == 0) {
            //floodfill
            this.floodFill(grid);
        }
    }

    floodFill = (grid) => {
        for (let xOff = -1; xOff <= 1; xOff++) {
            for (let yOff = -1; yOff <= 1; yOff++) {
                let i = this.i + xOff;
                let j = this.j + yOff;

                if (i > -1 && i < size && j > -1 && j < size) {
                    let neighbour = grid[i][j];
                    if (!neighbour.bee && !neighbour.revealed) {
                        neighbour.reveal(grid);
                    }
                }
            }
        }
    }

    countBombs = (grid) => {
        if (this.bomb) {
            this.neighbourCount = -1;
            return;
        }
        let total = 0;

        for (let xOff = -1; xOff <= 1; xOff++) {
            for (let yOff = -1; yOff <= 1; yOff++) {
                let i = this.i + xOff;
                let j = this.j + yOff;

                if (i > -1 && i < size && j > -1 && j < size) {
                    let neighbour = grid[i][j];
                    if (neighbour.bomb) {
                        total++;
                    }
                }
            }
        }
        this.neighbourCount = total;
    }
}

module.exports = {
    name: 'minesweeper',
    description: 'minesweeper!',
    execute: async (message, args) => {

        //create grid
        let grid = make2DArray(size, size);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                grid[i][j] = new Cell(i, j);
            }
        }
        let options = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                options.push([i, j])
            }
        }

        //5 random spots for bombs
        for (let n = 1; n <= totalBombs; n++) {
            let index = Math.floor(Math.random() * options.length);
            let choice = options[index];
            let i = choice[0];
            let j = choice[1];
            options.splice(index, 1);
            grid[i][j].bomb = true;
        }

        //count bombs
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                grid[i][j].countBombs(grid);
            }
        }

        const filter = m => {
            //test if bot / valid syntax
            try {
                let ans = !m.author.bot && ('abcdefghi'.includes(m.content.charAt(0)) && '123456789'.includes(m.content.charAt(1)))
                if (ans) {
                    let j = m.content.charAt(1);
                    let i = m.content.charAt(0).charCodeAt(0) - 96
                    ans = ans && !grid[j - 1][i - 1].revealed;
                }

                return ans;
            } catch {
                console.log('return false')
                return false;
            }
        }

        let collectNext = () => {
            const collector = new Discord.MessageCollector(message.channel, filter, {
                time: 1000 * 60 * 2,
                max: 1
            })

            collector.on('collect', m => {

                let j = m.content.charAt(1);
                let i = m.content.charAt(0).charCodeAt(0) - 96

                grid[j - 1][i - 1].reveal(grid)
                collector.stop();

                //if u lost
                if (grid[j - 1][i - 1].bomb) {

                    //show full grid
                    grid.forEach(col => {
                        col.forEach(square => {
                            square.revealed = true;
                        })
                    })
                    showGrid(grid, message, 'You Lost!')
                    return;
                }

                //check if u won the game
                let won = true;
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (!grid[i][j].bomb && !grid[i][j].revealed) {
                            won = false;
                        }
                    }
                }
                if (won) {
                    grid.forEach(col => {
                        col.forEach(square => {
                            square.revealed = true;
                        })
                    })
                    showGrid(grid, message, 'You Won!')

                    return;
                }

                showGrid(grid, m, 'Type a coordinate!');
                collectNext();
            })
        }
        showGrid(grid, message, 'Type a coordinate!')
        collectNext();
    },
};

let showGrid = (grid, message, title) => {
    let field = `:black_large_square::regional_indicator_a::regional_indicator_b::regional_indicator_c::regional_indicator_d::regional_indicator_e::regional_indicator_f::regional_indicator_g::regional_indicator_h::regional_indicator_i:`;
    for (let i = 0; i < size; i++) {
        if (i == 0) {
            field += `\n \`1:\``
        } else {
            field += `\n \`${i + 1}:\``
        }
        for (let j = 0; j < size; j++) {
            let square = grid[i][j]
            if (!square.revealed) {
                field += ':black_large_square:'
            } else {
                if (square.bomb) {
                    field += ':heart:'
                } else {
                    field += numberEmoji[square.neighbourCount];
                }
            }
        }
    }
    let embed = new Discord.MessageEmbed()
        .setDescription(field)
        .setTitle(title)
        .setFooter('Minesweeper')
        .setColor('#0099ff')
        
    message.channel.send(embed);
}