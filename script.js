import { recursiveDivision } from "./Algorithms/Maze/recursiveDivision.js"
import { depthFirstSearch } from "./Algorithms/Search/depthFirstSearch.js";
import { breadthFirstSearch } from "./Algorithms/Search/breadthFirstSearch.js"
import { recursiveBacktracking } from "./Algorithms/Maze/recursiveBacktracking.js";
import { dijkstrasAlgorithm } from "./Algorithms/Search/DijkstrasAlgorithm.js"
import { aStar } from "./Algorithms/Search/aStar.js";
import { primsAlgorithm } from "./Algorithms/Maze/primsAlgorithm.js";

class Cell {
    constructor(x, y, isPath) {
        this.x = x;
        this.y = y;
        this.isPath = isPath;
        this.isVisited = false;
        this.weight = 1;
    }
}

(function setup() {
    const container = document.querySelector('#container');
    const rows = 31, cols = 51;
    const START_COLOR = "red";
    const TARGET_COLOR = "blue";
    const PATH_COLOR = getPathColor();

    let isMouseDown = false, isMiddleMouseDown = false;
    let mazeExists = false, pathExists = false;
    let startCellObj, targetCellObj;
    let previousCellObj = null;
    let algorithmIsRunning = false;
    let algorithmUsed = "";
    let cellToDrag = "";
    let dragging = false;
    let board = [];

    board = createBoard(board, rows, cols);

    function createBoard(board, rows, cols) {
        board = [];
        for (let i = 0; i < rows; i++) {
            const row = container.appendChild(document.createElement('div'));
            let col = [];
            for (let j = 0; j < cols; j++) {
                col[j] = new Cell(j, i, true);

                const cell = document.createElement('div');
                cell.id = i + "-" + j;
                cell.className = "cell";
                row.appendChild(cell);
            }
            board.push(col);
        }
        console.log(board)
        placeStartCell(board);
        placeTargetCell(board);
        return board;
    }

    function clearBoard(board) {
        // Reset board each cell.
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j] = new Cell(j, i, true);
            }
        }
        targetCellObj = null;
        startCellObj = null;

        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.style.backgroundColor = PATH_COLOR;
        })
        enableButtons(".mazeBtn");
        enableButtons(".searchBtn");
        pathExists = false;

        console.log(board)
    }

    function clearStartCell(board, startCellObj) {
        let x = startCellObj.x;
        let y = startCellObj.y;

        board[y][x].isStart = false;
        colorCell(board[y][x], PATH_COLOR);

        startCellObj = null;
    }

    function clearTargetCell(board, targetCellObj) {
        let x = targetCellObj.x;
        let y = targetCellObj.y;

        board[y][x].isTarget = false;
        colorCell(board[y][x], PATH_COLOR);

        targetCellObj = null;
    }
    function placeStartCell(board) {
        let randX = Math.floor(board[0].length * 0.25), randY = Math.floor(board.length * 0.25);
        while (!board[randY][randX].isPath) {
            randX = getRandomInt(0, board.length / 4);
            randY = getRandomInt(0, board[0].length / 4);
        }
        startCellObj = board[randY][randX];
        startCellObj.isStart = true;
        console.log("start cell ", startCellObj)
        document.getElementById(randY + "-" + randX).style.backgroundColor = START_COLOR;
    }

    function placeTargetCell(board) {
        let randX = Math.floor(cols * 0.75), randY = Math.floor(rows * 0.75);
        console.log("y", randY, "x", randX)
        while (!board[randY][randX].isPath) {
            randX = getRandomInt(board.length * 0.75, board[0].length - 1);
            randY = getRandomInt(board[0].length / 3, board.length - 1);
            console.log("y", randY, "x", randX)
        }
        targetCellObj = board[randY][randX];
        targetCellObj.isTarget = true;
        console.log("y", randY, "x", randX)
        document.getElementById(randY + "-" + randX).style.backgroundColor = TARGET_COLOR;
    }

    function getCellObject(cell, board) {
        let coords = getCellCoords(cell);

        return board[coords[0]][coords[1]];
    }

    function getCellCoords(cell) {
        let coords = cell.id.split("-");
        coords[0] = parseInt(coords[0]);
        coords[1] = parseInt(coords[1]);
        return coords;
    }

    function isMatch(cell, target) {
        let coords = getCellCoords(cell);
        console.log(coords)
        console.log(target.y, target.x)
        if (coords[0] == target.y && coords[1] == target.x) {
            return true;
        } else {
            return false;
        }
    }

    function moveTargetCell(prevTarget, newTarget) {
        // Make prev target not target, and color
        prevTarget.isTarget = false;
        colorCell(prevTarget, PATH_COLOR);

        // Change target
        newTarget.isTarget = true;
        colorCell(newTarget, TARGET_COLOR)
        targetCellObj = newTarget;
    }

    function moveStartCell(prevTarget, newStart) {
        prevTarget.isStart = false;
        colorCell(prevTarget, PATH_COLOR);

        newStart.isStart = true;
        colorCell(newStart, START_COLOR);
        startCellObj = newStart;
    }

    function colorCell(cellObj, color) {
        let x = cellObj.x;
        let y = cellObj.y;

        document.getElementById(y + "-" + x).style.backgroundColor = color;
    }


    async function drawMaze(board, algorithm, rows, cols) {
        clearStartCell(board, startCellObj);
        clearTargetCell(board, targetCellObj);
        mazeExists = true;
        disableButtons(".mazeBtn",);
        disableButtons(".searchBtn");
        disableButtons(".gridBtn");
        console.log("algorithm", algorithm)
        switch (algorithm) {
            case "recursiveDivision":
                board = await recursiveDivision(cols, rows, board);
                break;
            case "recursiveBacktracking":
                board = await recursiveBacktracking(cols, rows, board);
                break;
            case "primsAlgorithm":
                board = await primsAlgorithm(cols, rows, board);
                break;

        }
        placeStartCell(board);
        placeTargetCell(board);
        enableButtons(".searchBtn");
        enableButtons(".gridBtn");
    }
    async function disableButtons(id) {
        console.log("disabling")
        document.querySelectorAll(id).forEach(btn => {
            btn.disabled = "true";
        })
    }
    function enableButtons(id) {
        document.querySelectorAll(id).forEach(btn => {
            btn.removeAttribute("disabled");
        })
    }

    async function startSearch(algorithim) {
        algorithmIsRunning = true;
        disableButtons(".searchBtn");
        disableButtons(".gridBtn");
        if (!mazeExists) disableButtons(".mazeBtn");
        algorithmUsed = algorithim;
        switch (algorithim) {
            case "bfs":
                console.log("path", pathExists)
                await breadthFirstSearch(startCellObj.x, startCellObj.y, targetCellObj.x, targetCellObj.y, board, pathExists);
                break;
            case "dfs":
                await depthFirstSearch(startCellObj.x, startCellObj.y, board, pathExists);
                break;
            case "dijkstras":
                await dijkstrasAlgorithm(startCellObj.x, startCellObj.y, board, pathExists);
                break;
            case "astar":
                await aStar(startCellObj.x, startCellObj.y, targetCellObj.x, targetCellObj.y, board, pathExists);

                break;
        }
        algorithmIsRunning = false;
        pathExists = true;
        console.log("Path exists", pathExists)
        enableButtons(".gridBtn");

    }

    function clearPath(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let cell = board[i][j];
                if (cell.isPath && !cell.isTarget && !cell.isStart) {
                    document.getElementById(i + "-" + j).style.backgroundColor = PATH_COLOR;
                }
            }
        }
        enableButtons(".searchBtn");
        if (!mazeExists) enableButtons(".mazeBtn");
    }
    // Event Listeners

    // Maze Listeners

    document.getElementById("recursiveDivision").onclick = async function (event) {
        drawMaze(board, event.target.id, rows, cols);
    };

    document.getElementById("recursiveBacktracking").onclick = async function () {
        drawMaze(board, event.target.id, rows, cols);
    };
    document.getElementById("primsAlgorithm").onclick = async function () {
        drawMaze(board, event.target.id, rows, cols);
    };

    // Search button listeners
    document.getElementById("dfs").onclick = async function (event) {
        startSearch(event.target.id)
    };

    document.getElementById("bfs").onclick = async function (event) {
        startSearch(event.target.id)
    };
    document.getElementById("dijkstras").onclick = async function (event) {
        startSearch(event.target.id)
    }
    document.getElementById("astar").onclick = async function (event) {
        startSearch(event.target.id)
    }

    // Board button listeners
    document.getElementById("resetGridBtn").addEventListener('click', function () {
        clearBoard(board);
        placeStartCell(board);
        placeTargetCell(board);
    })

    document.getElementById("clearPathBtn").addEventListener('click', function () {
        clearPath(board);
        pathExists = false;
    })

    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener('mouseout', function (event) {
            if (isMouseDown) {
                // Update previous if target is start cell
                if (dragging == false) {
                    if (isMatch(event.target, targetCellObj)) {
                        cellToDrag = "target";
                        dragging = true;
                    }
                    if (isMatch(event.target, startCellObj)) {
                        cellToDrag = "start";
                        dragging = true;
                    }
                    previousCellObj = getCellObject(event.target, board);
                }
            }
        })

        cell.addEventListener('mouseenter', async function (event) {
            let newCellObj = getCellObject(event.target, board);

            if (isMouseDown && previousCellObj != null && newCellObj.isPath
                && algorithmIsRunning == false) {

                if (cellToDrag == "target" && !newCellObj.isStart) {
                    moveTargetCell(previousCellObj, newCellObj, board);
                    previousCellObj = newCellObj;
                }
                if (cellToDrag == "start" && !newCellObj.isTarget && !pathExists) {
                    moveStartCell(previousCellObj, newCellObj);
                    previousCellObj = newCellObj;
                }

                // If pathExists recalculate the path
                if (pathExists && cellToDrag == "target") {
                    clearPath(board);
                    startSearch(algorithmUsed);
                }
            }

            // Color cells brown and increase the weight of the cell if mouse 3 is pressed
            if (isMiddleMouseDown && !newCellObj.isStart && !newCellObj.isTarget) {
                colorCell(newCellObj, "brown");
                newCellObj.weight = 10;
            }
        })
    })

    // Mouse Listeners
    document.body.onmousedown = function (event) {
        if (event.button == 0) {
            console.log("mouse down")
            isMouseDown = true;
            event.preventDefault();
        }
        if (event.button == 1) {
            console.log("middle mouse down")
            isMiddleMouseDown = true;
        }

        // if(event.target.className == "cell"){
        //     console.log(event.target)
        //    let obj = getCellObject(event.target);
        //     if(isMouseDown && !obj.isStart && !obj.isTarget){
        //         event.target.style.backgroundColor = "black";
        //     }
        // }
        
    }

    document.body.onmouseup = function (event) {
        if (event.button == 0) {
            console.log("mouse up")
            isMouseDown = false;
            previousCellObj = null;
            cellToDrag = "";
            dragging = false;
        }
        if (event.button == 1) {
            isMiddleMouseDown = false;
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
})()

export function getPathColor() {
    return "rgb(208, 211, 212)";
}

export function getWallColor() {
    return "rgb(23, 32, 42)";
}

export function getVisitedColor() {
    return "rgb(54, 69, 79)";
}

export function getCurrentColor() {
    return "rgb(52, 152, 219)";
}