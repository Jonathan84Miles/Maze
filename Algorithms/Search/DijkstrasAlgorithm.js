import { getCurrentColor, getPathColor, getVisitedColor, getWallColor } from "../../script.js";

export async function dijkstrasAlgorithm(startX, startY, board) {
    let timer = 0;
    // Mark all nodes unvisited. Create a set of all the unvisited nodes
    // called the unvisited set.
    const CURRENT_COLOR = getCurrentColor();
    const VISITED_COLOR = getVisitedColor();

    let unvisited = [], visited = [], neighbours = [];
    let currentCell;
    let finished = false;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].x == startX && board[i][j].y == startY) {
                board[i][j].cost = 0;
            } else {
                board[i][j].weight = 1;
                board[i][j].cost = Infinity;
            }
            unvisited.push(board[i][j]);
        }
    }
    console.log(unvisited);

    while (!finished) {
        if (unvisited.length == 0) {
            finished = true;
        } else {

            // Get the unvisited cell with lowest cost

            currentCell = getLowestCostUnvisitedCell(unvisited);
            console.log(currentCell);
            if ( !(currentCell.isGoal || currentCell.isStart) ) {
                console.log(currentCell.isGoal, currentCell.isStart)
                document.getElementById(currentCell.y + "-" + currentCell.x).style.backgroundColor = CURRENT_COLOR;
                await sleep(timer);
            }
            // get the unvisited neighbours for the current cell

            neighbours = getUnvisitedNeighbours(currentCell, unvisited);
            console.log(neighbours)

            // Update the cost for each neighbour
            for (let i = 0; i < neighbours.length; i++) {
                let cost = 0;
                cost = currentCell.cost + neighbours[i].weight;
                if (cost < neighbours[i].cost) {
                    // Update cost and previous node.
                    neighbours[i].cost = cost;
                    neighbours[i].previous = currentCell;
                }
            }

            // Add currentCell to visted list and set to visited
            visited.push(currentCell);
            currentCell.isVisited = true;
            if (!(currentCell.isGoal || currentCell.isStart)) {
                document.getElementById(currentCell.y + "-" + currentCell.x).style.backgroundColor = VISITED_COLOR;
                await sleep(timer);
            }

            // Remove current cell from unvisited list
            removeByIndex(currentCell, unvisited);

            if (currentCell.isGoal == true) {
                console.log("found goal")
                finished = true;
                // trace back path
                let hasPrevious = true;
                let previous = currentCell.previous;

                while (hasPrevious) {
                    if (!previous.previous) {
                        hasPrevious = false;
                    }
                    // color
                    if(!previous.isStart){
                        console.log(previous)
                         document.getElementById(previous.y + "-" + previous.x).style.backgroundColor = CURRENT_COLOR;
                        await sleep(timer)
                    
                    }
                       
                    previous = previous.previous;
                }
            }
        }
    }

}

function getLowestCostUnvisitedCell(unvisitedList) {
    let lowestCost = Infinity, lowestCostIndex = 0;
    for (let i = 0; i < unvisitedList.length; i++) {
        if (unvisitedList[i].cost < lowestCost) {
            lowestCost = unvisitedList[i].cost;
            lowestCostIndex = i;
        }
    }
    return unvisitedList[lowestCostIndex];
}

function getUnvisitedNeighbours(currentCell, unvisitedList) {
    let x = currentCell.x;
    let y = currentCell.y;
    let neighbours = [];

    for (let i = 0; i < unvisitedList.length; i++) {
        let neighbour = unvisitedList[i];

        if (neighbour.isPath == true) {

            // Right neighbour
            if (x + 1 == neighbour.x && y == neighbour.y) {
                neighbours.push(neighbour);
            }
            // Top neighbour
            if (x == neighbour.x && y + 1 == neighbour.y) {
                neighbours.push(neighbour);
            }
            // Left neighbour
            if (x - 1 == neighbour.x && y == neighbour.y) {
                neighbours.push(neighbour);
            }
            // Bottom neighbour
            if (x == neighbour.x && y - 1 == neighbour.y) {
                neighbours.push(neighbour);
            }
        }

    }
    return neighbours;
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
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
