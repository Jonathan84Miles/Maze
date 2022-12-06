export async function aStar(x, y, goalX, goalY, board) {
    let visited = [], unvisited = [];
    let finished = false;
    let fscore, gscore;
    let currentCell;
    let neighbours;
    // Initialise fscore and gscore to infinity and 
    // previous to null
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j].gscore = Infinity;
            board[i][j].fscore = Infinity;
            board[i][j].weight = 1;
            board[i][j].previous = null;
            if (board[i][j].x == x && board[i][j].y == y) {
                currentCell = board[i][j];
            }
            unvisited.push(board[i][j]);
        }
    }
    console.log(currentCell);

    // Update fscore and gscore for currentCell
    fscore = heuristic(currentCell.x, currentCell.y, goalX, goalY);
    currentCell.gscore = 0;
    currentCell.fscore = fscore;


    while (!finished) {
        if (unvisited.length == 0) {
            finished = true;
        } else {
            // Get the unvisted cell with the lowest fscore
            currentCell = getMinFScore(unvisited);
            document.getElementById(currentCell.y + "-" + currentCell.x).style.backgroundColor = "red";
            await sleep(30);

            if (currentCell.x == goalX && currentCell.y == goalY) {
                finished = true;
                currentCell.visited = true;
                visited.push(currentCell);

            } else {
                // Get current cells unvisited neighbours
                neighbours = getUnvisitedNeighbours(currentCell, unvisited);
                console.log("neighbours", neighbours)

                for (let i = 0; i < neighbours.length; i++) {
                    let neighbour = neighbours[i];
                    // calculate gscore for neighbour
                    // ADD WEIGHT HERE!!!!!!!!!!!!!!!!!!!!!!!!!!
                    let newGscore = currentCell.gscore + neighbour.weight;
                    console.log("new g score", newGscore);

                    // Check if gscore is less than cells current gscore
                    if (newGscore < neighbour.gscore) {
                        // update gscore, fscore and previous
                        neighbour.gscore = newGscore;
                        neighbour.fscore = newGscore + heuristic(neighbour.x, neighbour.y, goalX, goalY);
                        console.log("a", currentCell);
                        neighbour.previous = currentCell;
                        console.log("neighbour", neighbour)

                    }
                }

                // Add current cell to visited list
                currentCell.visited = true;
                visited.push(currentCell);

                // remove current cell from unvisited list
                removeByIndex(currentCell, unvisited);
                console.log("unvisited length", unvisited.length)
            }
        }
    }
    // return visited list
}

function getMinFScore(unvisited) {
    let min = Infinity;
    let minCell;
    for (let i = 0; i < unvisited.length; i++) {
        if (unvisited[i].fscore < min) {
            min = unvisited[i].fscore;
            minCell = unvisited[i];
        }
    }
    console.log("min fscore", minCell)
    return minCell;
}

function heuristic(x, y, goalX, goalY) {
    let dx, dy;

    dx = Math.abs(x - goalX);
    dy = Math.abs(y - goalY);

    console.log("x", x, "y", y, "distance", (dx + dy))
    return (dx + dy);
}

function removeByIndex(currentCell, unvisitedList) {
    let index = 0;
    let x = currentCell.x, y = currentCell.y;
    for (let i = 0; i < unvisitedList.length; i++) {
        if (x == unvisitedList[i].x && y == unvisitedList[i].y) {
            index = i;
            break;
        }
    }
    unvisitedList.splice(index, 1);
}

function getUnvisitedNeighbours(currentCell, unvisited) {
    let x = currentCell.x, y = currentCell.y;
    let neighbour, neighbours = [];

    for (let i = 0; i < unvisited.length; i++) {
        neighbour = unvisited[i];
        if (neighbour.isPath) {

            // Top
            if (y + 1 == neighbour.y && x == neighbour.x) {
                neighbours.push(neighbour);
            }
            // Right
            if (y == neighbour.y && x + 1 == neighbour.x) {
                neighbours.push(neighbour);
            }

            // Bottom
            if (y - 1 == neighbour.y && x == neighbour.x) {
                neighbours.push(neighbour);
            }

            // Left 
            if (y == neighbour.y && x - 1 == neighbour.x) {
                neighbours.push(neighbour);
            }
        }
    }
    return neighbours;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
