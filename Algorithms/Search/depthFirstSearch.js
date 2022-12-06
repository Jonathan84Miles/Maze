let timer = 15;
export async function depthFirstSearch(x, y, board,pathExists) {
    initialise(board);
    await search(x, y, board,pathExists);
}

function initialise(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j].isVisited = false;
        }
    }
}

async function search(x, y, board,pathExists) {
    let stack = [];
    let currentCell, neighbours;

    // Add starting cell to stack and mark it visited
    stack.push(board[y][x]);
    board[y][x].isVisited == true;

    while (stack.length > 0) {
        // Get cell from top of stack
        currentCell = stack[stack.length - 1];
        currentCell.isVisited = true;
       
        // Check if current cell is the target
        if (currentCell.isTarget == true) {
            return;
        }

        if (currentCell.x == x && currentCell.y == y) {
           await colorCell(currentCell,"rgb(23, 165, 137)",pathExists);
        } else {
           await colorCell(currentCell,"rgb(52, 152, 219)",pathExists);
        }

        neighbours = getUnvisitedNeighbours(currentCell, board);

        if (neighbours.length > 0) {
            for(let i =0; i < neighbours.length;i++){
                stack.push(neighbours[i]);
            }

        } else {
            stack.pop();
            if (!(currentCell.x == x && currentCell.y == y)) {
               await colorCell(currentCell,"rgb(54, 69, 79)",pathExists);
            }
        }
    }
}

async function colorCell(cell, color, pathExists) {
    let x = cell.x, y = cell.y;
    if (!(cell.isTarget || cell.isStart)) {
        document.getElementById(y + "-" + x).style.backgroundColor = color;
        if (!pathExists) await sleep(timer)

    }
}

function getUnvisitedNeighbours(currentCell, board) {
    let neighbours = [];
    let x = currentCell.x, y = currentCell.y;

    // Left
    if (x - 1 >= 0 && board[y][x - 1].isPath == true && board[y][x - 1].isVisited == false) {
        neighbours.push(board[y][x - 1]);
    }
    // Down
    if (y + 1 < board.length && board[y + 1][x].isPath == true && board[y + 1][x].isVisited == false) {
        neighbours.push(board[y + 1][x]);
    }
    // Right
    if (x + 1 < board[0].length && board[y][x + 1].isPath == true && board[y][x + 1].isVisited == false) {
        neighbours.push(board[y][x + 1]);
    }
    // Up
    if (y - 1 >= 0 && board[y - 1][x].isPath == true && board[y - 1][x].isVisited == false) {
        neighbours.push(board[y - 1][x]);

    }
    return neighbours;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
