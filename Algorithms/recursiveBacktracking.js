let timer = 2;
let timer2 = 2;
class Cell {
    constructor(x, y, isWall, isVisited) {
        this.x = x;
        this.y = y;
        this.isVisited = isVisited;
        this.isWall = isWall;
    }
}
export async function recursiveBacktracking(width, height, board) {
    console.log("here")
    await initialise(width, height, board);

    await generateMaze(1, 1, board)

}

async function generateMaze(x, y, board) {
    let cell = document.getElementById(y + "-" + x);
    let neighbours = [];
    document.getElementById(y + "-" + x).style.backgroundColor = "red"
    board[y][x] = 0;
    await sleep(timer2);


    // Check for adjacent cells to visit
    neighbours = await getUnvisitedNeighbours(x, y, board);

    for (let i = 0; i < neighbours.length; i++) {
        let cell2 = document.getElementById(neighbours[i][2] + "-" + neighbours[i][1])
        await sleep(timer2)
    }

    if (neighbours.length == 0) {
        console.log("no neighbours")
        document.getElementById(y + "-" + x).style.color = "white";
        return;
    } else {
        while (neighbours.length > 0) {
            await sleep(timer);
            console.log(neighbours)
            let rand = getRandomInt(0, neighbours.length - 1);
            let chosenNeighbour = neighbours[rand];
            neighbours.splice(rand, 1)
            // remove rand index from neighbours;


            let direction = chosenNeighbour[0];
            let newX = chosenNeighbour[1], newY = chosenNeighbour[2];
            console.log("newX", newX)
            console.log("newY", newY)
            let pathX, pathY;
            switch (direction) {
                case "North":
                    pathX = x;
                    pathY = y + 1;
                    break;
                case "East":
                    pathX = x + 1;
                    pathY = y;
                    break;
                case "South":
                    pathX = x;
                    pathY = y - 1;
                    break;
                case "West":
                    pathX = x - 1;
                    pathY = y;
                    break;
            }
            console.log("here", board[newY][newX])
            if (board[newY][newX] == 0.5) {
                console.log("here2")
                board[newY][newX] = 0;

                // new Path cell
              
                document.getElementById(newY + "-" + newX).style.backgroundColor = "red";
                document.getElementById(pathY + "-" + pathX).style.backgroundColor = "red";
                board[pathY][pathX] = 0;
                await sleep(timer)
                // Recursed
                await generateMaze(newX, newY, board);
            }

        }
    }

    console.log("neighbours", neighbours)

}

async function getUnvisitedNeighbours(x, y, board) {
    let width = board[0].length;
    let height = board.length;
    let neighbours = [];

    // North
    if (y + 2 < height - 1) {
        if (board[y + 2][x] == 0.5) {
            console.log("Added neighbour isVisited", board[y + 2][x] == 0.5)
            neighbours.push(["North", x, y + 2]);
        }

    }
    // East
    if (x + 2 < width - 1) {
        if (board[y][x + 2] == 0.5) {
            console.log("Added neighbour isVisited", board[y][x + 2] == 0.5)
            neighbours.push(["East", x + 2, y]);
        }
    }

    // South
    if (y - 2 > 0) {
        if (board[y - 2][x] == 0.5) {
            console.log("Added neighbour isVisited", board[y - 2][x] == 0.5)
            neighbours.push(["South", x, y - 2]);
        }
    }
    // West
    if (x - 2 > 0) {
        if (board[y][x - 2] == 0.5) {
            console.log("Added neighbour isVisited", board[y][x - 2] == 0.5)
            neighbours.push(["West", x - 2, y]);
        }
    }
    return neighbours;
}

async function initialise(width, height, board) {
    let row, col;

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (i % 2 == 0 || j % 2 == 0) {
                board[i][j] = 1;
                document.getElementById(i + "-" + j).style.backgroundColor = "black"
            } else {
                board[i][j] = 0.5;
                document.getElementById(i + "-" + j).style.backgroundColor = "black"
            }
        }
    }
    console.log(board)
    // Top
    for (let i = 0; i < width; i++) {
        row = 0;
        board[row][i] = 1;
        document.getElementById(row + "-" + i).style.backgroundColor = "black";
        await sleep(timer);
    }

    // Right
    for (let i = 0; i < height; i++) {
        col = width - 1;
        board[i][col] = 1;
        document.getElementById(i + "-" + col).style.backgroundColor = "black";
        await sleep(timer);
    }

    // Bottom
    for (let i = width - 1; i >= 0; i--) {
        let cell, row = height - 1;
        board[row][i] = 1;
        document.getElementById(row + "-" + i).style.backgroundColor = "black";
        await sleep(timer);
    }

    // Left
    for (let i = height - 1; i >= 0; i--) {
        let cell, col = 0;
        board[row][i] = 1;
        cell = document.getElementById(i + "-" + col).style.backgroundColor = "black";
        await sleep(timer);
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}