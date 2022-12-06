import { getCurrentColor, getPathColor, getVisitedColor, getWallColor } from "../../script.js";

let timer = 10;
export async function breadthFirstSearch(startX, startY, targetX, targetY, board,pathExists) {
    initialise(board)
    let finish = await search(startX, startY, targetX, targetY, board,pathExists);
    let path = getPath(finish);
    await drawPath(path, getCurrentColor(),pathExists);

}

// Cells may be marked visited from the maze generation 
// algorithm so mark all cells unvisited before starting search
function initialise(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j].isVisited = false;
        }
    }
}

async function search(startX, startY, targetX, targetY, board,pathExists) {
    const CURRENT_COLOR = getCurrentColor();
    const VISITED_COLOR = getVisitedColor();

    let queue = [];
    let neighbours = [];
    let root, curr;
    //Add start to queue and mark as visited
    root = board[startY][startX];
    queue.push(root);
    root.isVisited = true;

    while (queue.length > 0) {
        let x, y;
        curr = queue.shift();
        x = curr.x;
        y = curr.y;
        if (!(x == startX && y == startY) && !(x == targetX && y == targetY)) {
           let cell =board[y][x];
           await colorCell(cell, CURRENT_COLOR,pathExists);
        }

       // await sleep(timer);

        if (x == targetX && y == targetY) {
            // Found target
            return curr;
        }

        neighbours = getNeighbours(curr, board);
        for (let i = 0; i < neighbours.length; i++) {
            let x = neighbours[i][0], y = neighbours[i][1];
            queue.push(board[y][x]);
            board[y][x].isVisited = true;
            board[y][x].parent = curr;

        }
        if (!(x == startX && y == startY) && !(x == targetX && y == targetY)) {
            let cell =  board[y][x];
            await colorCell(cell,VISITED_COLOR,pathExists);
        }
    }
}

async function colorCell(cell, color, pathExists) {
    let x = cell.x, y = cell.y;
    if (!(cell.isTarget || cell.isStart)) {
        document.getElementById(y + "-" + x).style.backgroundColor = color;
        if (pathExists == false) await sleep(timer)
    }
}

async function drawPath(path, CURRENT_COLOR,pathExists) {
    for (let i = 1; i < path.length; i++) {
        document.getElementById(path[i][1] + "-" + path[i][0]).style.backgroundColor = CURRENT_COLOR
        if (pathExists == false)  await sleep(30);
    }
}

function getPath(cell) {
    let path = [];
    let current = cell;
    let parentCell;
    while ('parent' in current) {
        path.push([current.x, current.y]);
        current = current.parent;
    }
    return path;
}

function getNeighbours(cell, board) {
    let neighbours = [];
    let x = cell.x, y = cell.y;
    // Up
    if (y + 1 < board.length && board[y + 1][x].isVisited == false && board[y + 1][x].isPath == true) {
        neighbours.push([x, (y + 1)]);
    }

    // Right
    if (x + 1 < board[0].length && board[y][x + 1].isVisited == false && board[y][x + 1].isPath == true) {
        neighbours.push([(x + 1), y]);
    }

    // Down
    if (y - 1 >= 0 && board[y - 1][x].isVisited == false && board[y - 1][x].isPath == true) {
        neighbours.push([x, (y - 1)]);
    }

    // Left
    if (x - 1 >= 0 && board[y][x - 1].isVisited == false && board[y][x - 1].isPath == true) {
        neighbours.push([(x - 1), y]);
    }

    return neighbours;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
