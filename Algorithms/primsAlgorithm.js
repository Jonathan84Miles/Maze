class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.wall = true;
        this.isFrontier = false;
    }
}

export function primsAlgorithm(board, width, height) {
    const DIRECTIONS = [
        [0, -2],
        [0, 2],
        [-2, 0],
        [2, 0]];

    let frontierList = [];
    // Initialise
    initializeBoard(board, width, height);

    // Get random starting cell

    // Get frontier cells from starting cell and mark them frontier

    getFrontiers(board[0][1], DIRECTIONS,board)
    while (frontierList.length > 0) {
        // Get neighbouring cells from selected frontier cell


    }

}

function getFrontiers(cell, DIRECTIONS, board){
    let x = cell.x, y = cell.y;
    let arr = [];

    for(let direction in DIRECTIONS){
        let newY = y + direction[0];
        let newX = x + direction[1];

        // It new coords are a valid position, and cell at position is not frontier or path (is wall)

}
}
function initializeBoard(board, width, height) {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            board[i][j] = new Cell(j, i);
        }
    }
    console.log(board)
}


export function primsAlgorithm2(board, width, height) {
    let frontierList, frontierCell, frontierIndex;
    let neighboursList, neighbour;
    let startingCell;
    let x, y;
    // turn all cells wall
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            board[i][j] = 1;
            setBackgroundColor(i, j, "black");
        }

    }

    console.log("board", board)
    // Choose random starting cell and make it white  
    x = getRandomInt(0, width - 1);
    y = getRandomInt(0, height - 1);
    startingCell = [y, x];

    console.log("start cell".startingCell);

    // Set starting cell to path
    board[y][x] = 0;
    setBackgroundColor(y, x, "white")

    // Get frontiers for starting cell
    frontierList = getFrontierCells(startingCell[0], startingCell[1], width, height, board);
    console.log("frontier list", frontierList)


    while (frontierList.length > 0) {

        // Pick random cell from frontier list
        let rand = getRandomInt(0, frontierList.length - 1);
        frontierCell = frontierList[rand];
        console.log("frontier cell", frontierCell)

        // Get its neighbours (Path cells with distance of 2)
        neighboursList = getNeighbours(frontierCell[0], frontierCell[1], width, height, board);
        console.log("neighbours list", neighboursList);

        // If neighbours neighbours list is not empty
        if (neighboursList.length > 0) {
            // Pick a random neighbour
            neighbour = neighboursList[getRandomInt(0, neighboursList.length - 1)];

            // connect the frontier cell to its neighbour
            // and set it to path

            connectCells(frontierCell[0], frontierCell[1],
                neighbour[0], neighbour[1], board);

            frontierList = [...frontierList, ...getFrontierCells(
                frontierCell[0], frontierCell[1], width, height, board)]

        }

        removeFrontier(frontierList, frontierIndex, frontierCell);

        neighboursList = [];
    }
}

function removeFrontier(array, index, frontier) {
    array.splice(index, 1);
    document.getElementById(frontier[0] + "-" + frontier[1]).style.backgroundColor = "black";
    return array;
}

function connectCells(y1, x1, y2, x2, board) {
    let x = (x1 + x2) / 2;
    let y = (y1 + y2) / 2;
    board[y][x] = 0;
    setBackgroundColor(y, x, "white");

}
function getNeighbours(y, x, width, height, array) {
    let neighboursArray = [];
    if ((x + 2 >= 0 && x + 2 < width)
        && array[y][x + 2] == 0) {
        neighboursArray.push([y, x + 2]);
    }
    if ((y + 2 >= 0 && y + 2 < height)
        && array[y + 2][x] == 0) {
        neighboursArray.push([y + 2, x]);
    }
    if ((x - 2 >= 0 && x - 2 < width)
        && array[y][x - 2] == 0) {
        neighboursArray.push([y, x - 2]);
    }
    if ((y - 2 >= 0 && y - 2 < height)
        && array[y - 2][x] == 0) {
        neighboursArray.push([y - 2, x]);
    }
    return neighboursArray;
}

function getFrontierCells(y, x, width, height, array) {
    let neighboursArray = [];
    if ((x + 2 >= 0 && x + 2 < width)
        && array[y][x + 2] == 1) {
        document.getElementById(y + "-" + (x + 2)).style.backgroundColor = "green";
        neighboursArray.push([y, x + 2]);
    }
    if ((y + 2 >= 0 && y + 2 < height)
        && array[y + 2][x] == 1) {
        document.getElementById((y + 2) + "-" + x).style.backgroundColor = "green";
        neighboursArray.push([y + 2, x]);
    }
    if ((x - 2 >= 0 && x - 2 < width)
        && array[y][x - 2] == 1) {
        document.getElementById(y + "-" + (x - 2)).style.backgroundColor = "green";
        neighboursArray.push([y, x - 2]);
    }
    if ((y - 2 >= 0 && y - 2 < height)
        && array[y - 2][x] == 1) {
        document.getElementById((y - 2) + "-" + x).style.backgroundColor = "green";
        neighboursArray.push([y - 2, x]);
    }
    return neighboursArray;
}

function setBackgroundColor(y, x, color) {
    document.getElementById(y + "-" + x).style.backgroundColor = color;
}

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

