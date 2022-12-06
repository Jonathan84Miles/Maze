import { getCurrentColor, getPathColor, getWallColor } from "../../script.js"

export async function primsAlgorithm(width, height, board) {
    const PATH_COLOR = getPathColor();
    const WALL_COLOR = getWallColor();
    const CURRENT_COLOR = getCurrentColor();
    let neighbours = new Set();
    let currentCell;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j].isPath = false;
            document.getElementById(i + "-" + j).style.backgroundColor = WALL_COLOR;
        }
    }

    // get starting cell, make it path and get its neighbours
    currentCell = board[1][1];
    currentCell.isPath = true;
    colorCell(currentCell, PATH_COLOR)
    getNeighbouringCells(currentCell, board).forEach(item => neighbours.add(item));
    while (neighbours.size > 0) {
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Get a random neighbour
        let rand = getRandomInt(0, neighbours.size - 1);
        let items = Array.from(neighbours);
        let neighbour = items[rand];
       await colorCell(neighbour, "red");
        let adjacentPathCells = [];
        // Connect the selected neighbour with a random path cell
        // at a distance of 2 from neighbour cell

        adjacentPathCells = getAdjacentPathCells(neighbour, board);
        await createPassage(neighbour, adjacentPathCells[getRandomInt(0, adjacentPathCells.length - 1)], board, PATH_COLOR);

        // Add the neighbours neighbouring cells
        getNeighbouringCells(neighbour, board, CURRENT_COLOR).forEach(item => neighbours.add(item));

        // Mark neighbour as path
        neighbour.isPath = true;
        neighbours.delete(neighbour);
    }
    return board;
}

async function createPassage(neighbour, middleCell, board, PATH_COLOR) {
    let nx = neighbour.x, ny = neighbour.y;

    if (neighbour.x == middleCell.x) {
        ny = Math.min(neighbour.y, middleCell.y) + Math.abs(neighbour.y - middleCell.y) - 1;
        await colorCell(board[ny][nx], PATH_COLOR);
    } else {
        nx = Math.min(neighbour.x, middleCell.x) + Math.abs(neighbour.x - middleCell.x) - 1;
        await colorCell(board[ny][nx], PATH_COLOR);
    }
    board[ny][nx].isPath = true;
    board[neighbour.y][neighbour.x].isPath = true;
    await colorCell(neighbour, PATH_COLOR);
}

function getAdjacentPathCells(cell, board) {
    let cellList = [];
    let y = cell.y, x = cell.x;

    // Top
    if (y - 2 > 0 && board[y - 2][x].isPath == true) {
        cellList.push(board[y - 2][x])
    }

    // Right
    if (x + 2 < board[0].length - 1 && board[y][x + 2].isPath == true) {
        cellList.push(board[y][x + 2]);
    }

    // Bottom
    if (y + 2 < board.length - 1 && board[y + 2][x].isPath == true) {
        cellList.push(board[y + 2][x]);
    }

    // Left
    if (x - 2 > 0 && board[y][x - 2].isPath == true) {
        cellList.push(board[y][x - 2]);
    }

    return cellList;
}


async function colorCell(cell, color) {
    let x = cell.x, y = cell.y;
        document.getElementById(y + "-" + x).style.backgroundColor = color;
        await sleep(10)
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getNeighbouringCells(cell, board, CURRENT_COLOR) {
    let x = cell.x, y = cell.y;
    let width = board[0].length;
    let height = board.length;
    let neighbours = [];
    // Top
    if ((y - 2 > 0) && board[y - 2][x].isPath == false) {
        document.getElementById((y - 2) + "-" + x).style.backgroundColor = CURRENT_COLOR;
        neighbours.push(board[y - 2][x]);
    }
    // Right
    if ((x + 2 < width - 1) && board[y][x + 2].isPath == false) {
        document.getElementById(y + "-" + (x + 2)).style.backgroundColor = CURRENT_COLOR;
        neighbours.push(board[y][x + 2]);
    }
    //Bottom
    if ((y + 2 < height - 1) && board[y + 2][x].isPath == false) {
        document.getElementById((y + 2) + "-" + x).style.backgroundColor = CURRENT_COLOR;
        neighbours.push(board[y + 2][x]);
    }
    // Left
    if ((x - 2 > 0) && board[y][x - 2].isPath == false) {
        document.getElementById(y + "-" + (x - 2)).style.backgroundColor = CURRENT_COLOR;
        neighbours.push(board[y][x - 2]);
    }
    return neighbours;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
