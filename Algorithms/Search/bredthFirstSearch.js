let timer = 20;
export async function breadthFirstSearch(startX, startY, goalX, goalY, board) {
    console.log("start board", board)
    initialise(board)
    let finish = await search(startX, startY, goalX, goalY, board);
    let path = getPath(finish);
    await drawPath(path, board);
    console.log(board[startY][startX]);
    console.log(board);
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

async function search(startX, startY, goalX, goalY, board) {
    console.log("search board", board)
    let queue = [];
    let neighbours = [];
    let root, curr;
    //Add start to queue and mark as visited
    root = board[startY][startX];
    queue.push(root);
    root.isVisited = true;
    console.log("queue", JSON.stringify(queue));

    while (queue.length > 0) {
        let x, y;
        curr = queue.shift();
        console.log("current", curr);
        x = curr.x;
        y = curr.y;
        if (!(x == startX && y == startY) && !(x == goalX && y == goalY)) {
            document.getElementById(y + "-" + x).style.backgroundColor = "blue";
        }

        await sleep(timer);

        if (x == goalX && y == goalY) {

            // Found goal
            return curr;
        }

        neighbours = getNeighbours(curr, board);
        console.log("neighbours ", neighbours)
        for (let i = 0; i < neighbours.length; i++) {
            let x = neighbours[i][0], y = neighbours[i][1];
            queue.push(board[y][x]);
            board[y][x].isVisited = true;
            board[y][x].parent = curr;
            console.log(board[y][x]);

        }
        if (!(x == startX && y == startY) && !(x == goalX && y == goalY)) {
            document.getElementById(y + "-" + x).style.backgroundColor = "orange";
        }

    }

}

async function drawPath(path, board) {
    console.log("drawing path")
    for (let i = 1; i < path.length; i++) {
        document.getElementById(path[i][1] + "-" + path[i][0]).style.backgroundColor = "blue"
        await sleep(timer);
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
    console.log(cell)
    // Up
    if (y + 1 < board.length && board[y + 1][x].isVisited == false && board[y + 1][x].isPath == true) {
        console.log("neighbour found")
        neighbours.push([x, (y + 1)]);
    }

    // Right
    if (x + 1 < board[0].length && board[y][x + 1].isVisited == false && board[y][x + 1].isPath == true) {
        console.log("neighbour found")
        neighbours.push([(x + 1), y]);
    }

    // Down
    if (y - 1 > 0 && board[y - 1][x].isVisited == false && board[y - 1][x].isPath == true) {
        console.log("neighbour found")
        neighbours.push([x, (y - 1)]);
    }

    // Left
    if (x - 1 > 0 && board[y][x - 1].isVisited == false && board[y][x - 1].isPath == true) {
        console.log("neighbour found")
        neighbours.push([(x - 1), y]);
    }

    return neighbours;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
