import { getCurrentColor, getVisitedColor } from "../../script.js";

export async function aStar(startX, startY, targetX, targetY, board, pathExists) {

    let visited = [], unvisited = [], neighbours = [];
    const CURRENT_COLOR = getCurrentColor();
    const VISITED_COLOR = getVisitedColor();
    let currentCell;
    let finished = false;
    let timer = 10;
    // Add all nodes to unvisited list and initialise gscore
    // and fscore to infinity and previous to null
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (i == startY && j == startX) {
                board[i][j].fscore = heuristic(j, i, targetX, targetY);
                board[i][j].gscore = 0;
            } else {
                board[i][j].gscore = Infinity;
                board[i][j].fscore = Infinity;
            }
            board[i][j].isVisited = false;
            board[i][j].previous = null
            unvisited.push(board[i][j]);
        }
    }

    // Repeat until unvisited list is empty 
    let count=0;
    while (finished == false) {
       
        if (unvisited.length == 0) {
            finished = true;
        } else {
            // Get unvisited cell with lowest fscore
            currentCell = getLowestFscore(unvisited);
            await colorCell(currentCell, CURRENT_COLOR, pathExists, timer)

            // Check if current cell is target cell
            if (currentCell.isTarget == true) {
                finished = true;
                currentCell.isVisited = true;
                visited.push(currentCell);
                await getShortestPath(currentCell.previous, CURRENT_COLOR, pathExists);
            } else {
                // Get current nodes neighbours
                neighbours = getUnvisitedNeighbours(currentCell, board);
                console.log("currentCell", count++)
                // For each unvisited neighbour,
                for (let i = 0; i < neighbours.length; i++) {

                    let neighbour = neighbours[i];

                    await colorCell(neighbour, "rgb(242, 107, 107)", pathExists)
                    // Calculate new gscore

                    let newGScore = currentCell.gscore + neighbour.weight;
                    // Is new gscore less than gscore
                    if (newGScore < neighbour.gscore) {
                        // Update gscore, fsacore, and previous
                        neighbour.gscore = newGScore;
                        console.log(newGScore)
                        console.log("h", heuristic(neighbour.x, neighbour.y, targetX, targetY))
                        neighbour.fscore = heuristic(neighbour.x, neighbour.y, targetX, targetY);
                        neighbour.previous = currentCell;
                    }
                }
                // Add current node to visited
                currentCell.isVisited = true;
                visited.push(currentCell);
                await colorCell(currentCell, VISITED_COLOR, pathExists, timer)
                // Remove current cell from unvisited 
                removeByIndex(currentCell, unvisited);
            }
        }      
    }

}

async function colorCell(cell, color, pathExists, timer) {
    let x = cell.x, y = cell.y;

    if (!(cell.isTarget || cell.isStart)) {
        document.getElementById(y + "-" + x).style.backgroundColor = color;
        if (!pathExists) {
            await sleep(timer)
        }
    }
}
async function getShortestPath(cell, CURRENT_COLOR, pathExists) {
    let x, y;
    while (cell.previous) {
        x = cell.x;
        y = cell.y;

        document.getElementById(y + "-" + x).style.backgroundColor = CURRENT_COLOR;
        if (!pathExists) await sleep(30)
        cell = cell.previous;
    }
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

function getUnvisitedNeighbours(cell, board) {
    let x = cell.x, y = cell.y;
    let neighbours = [];
    // Top
    if ((y - 1 >= 0) && board[y - 1][x].isPath && !board[y - 1][x].isVisited) {
        neighbours.push(board[y - 1][x]);
    }
    // Right
    if ((x + 1 < board[0].length) && board[y][x + 1].isPath && !board[y][x + 1].isVisited) {
        neighbours.push(board[y][x + 1]);
    }

    // Bottom
    if ((y + 1 < board.length) && board[y + 1][x].isPath && !board[y + 1][x].isVisited) {
        neighbours.push(board[y + 1][x]);
    }

    // Left
    if ((x - 1 >= 0) && board[y][x - 1].isPath && !board[y][x - 1].isVisited) {
        neighbours.push(board[y][x - 1]);
    }
    return neighbours;
}

function getLowestFscore(unvisited) {
    let lowest = Infinity;
    let lowestIndex;
    for (let i = 0; i < unvisited.length; i++) {
        if (unvisited[i].fscore <= lowest) {
            lowest = unvisited[i].fscore;
            lowestIndex = i;
        }
    }
    return unvisited[lowestIndex];
}
function heuristic(x,y,targetX,targetY){
let dx , dy;
dy = Math.abs(y - targetY);
dx = Math.abs(x - targetX);
return dx + dy;
}

// function heuristic(x, y, targetX, targetY) {
//     let dx, dy;
//     dx = Math.pow( (x - targetX),2);
//     dy = Math.pow( (y - targetY),2);
//     return Math.sqrt(dx+dy);
// }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
