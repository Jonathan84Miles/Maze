import { recursiveDivision } from "./Algorithms/Maze/recursiveDivision.js"
import { depthFirstSearch } from "./Algorithms/Search/depthFirstSearch.js";
import { breadthFirstSearch } from "./Algorithms/Search/breadthFirstSearch.js"
import { recursiveBacktracking } from "./Algorithms/Maze/recursiveBacktracking.js";

class Cell {
    constructor(x, y, isPath) {
        this.x = x;
        this.y = y;
        this.isPath = isPath;
        this.isVisited = false;
    }
}

(function setup() {
    let width, height;
    console.log("here")
    let startCell;
    let goalCell, isMouseDown = false;
    let board = [];
    let resetButton = document.getElementById("resetButton");
    const container = document.querySelector('#container');
    createBoxes(31, 51);

    function createBoxes(rows, cols) {
        width = cols;
        height = rows;
        for (let i = 0; i < rows; i++) {
            const row = container.appendChild(document.createElement('div'));
            let colArray = [];
            for (let j = 0; j < cols; j++) {
                colArray[j] = new Cell(j, i, true);

                const cell = document.createElement('div');
                cell.id = i + "-" + j;
                cell.className = "cell";
                row.appendChild(cell);
            }
            board.push(colArray);
        }
        console.log(board);
    }
    function printBoard(board) {
        let row;
        for (let i = 0; i < board.length; i++) {
            row = "";
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j].isPath == true) {
                    row += "0";
                } else {
                    row += "1";
                }
            }
            console.log(row)
        }
    }

    // Maze button listeners
    document.getElementById("recursiveDivision").onclick = async function (event) {
        board = await recursiveDivision(board[0].length, board.length, board);
        console.log("returned board");
        printBoard(board);
        placeStartCell(board);
        placeGoalCell(board);
    };

    document.getElementById("recursiveBacktracking").onclick = async function (event) {
        board = await recursiveBacktracking(board[0].length, board.length, board);
        console.log("returned board");
        printBoard(board);
        placeStartCell(board);
        placeGoalCell(board);
    };

    // Search button listeners
    document.getElementById("dfs").onclick = async function (event) {
        await depthFirstSearch(startCell[1], startCell[0], goalCell[1], goalCell[0], board);
    }

    document.getElementById("bfs").onclick = async function (event) {
        await breadthFirstSearch(startCell[1], startCell[0], goalCell[1], goalCell[0], board);
    }

    function placeStartCell(board) {
        let randX = 0, randY = 0;
        while (!board[randY][randX].isPath) {
            randX = getRandomInt(0, board.length / 4);
            randY = getRandomInt(0, board[0].length / 4);
        }
        startCell = [randY, randX];
        console.log(startCell)
        document.getElementById(randY+"-"+randX).style.backgroundColor = "rgb(23, 165, 137)";
    }
    function placeGoalCell(board) {
        let randX = 0, randY = 0;
        while (!board[randY][randX].isPath) {
            randX = getRandomInt(board.length * 0.75, board[0].length-1);
            randY = getRandomInt(board[0].length /3, board.length-1);
        }
        goalCell = [randY, randX];
        console.log(goalCell)
        document.getElementById(randY+"-"+randX).style.backgroundColor = "rgb(142, 68, 173)";
    }
    document.getElementById("container").addEventListener('mouseover', function (event) {

        if (isMouseDown) {
            console.log("mouse is down")
            console.log(window.getComputedStyle(event.target).backgroundColor)
            let bg = window.getComputedStyle(event.target).backgroundColor;

            if (bg != "rgb(255, 0, 0)") {
                event.target.style.backgroundColor = "blue";
                let coords = getCellCoords(event.target.id);
                console.log(coords)
                board[coords[0]][coords[1]] = 1;
            }
        }
    })

    function getCellCoords(str) {
        return str.split("-");
    }

    document.getElementById("container").addEventListener("click", function (event) {
        if ("buttons" in event) {
            console.log(event.button)
            if (event.button == 0) {
                console.log("left click")
            }
        }

        if (event.target && event.target.className == "cell") {
            let element = event.target;
            let bg = window.getComputedStyle(element).backgroundColor;
            console.log(bg)
            if (bg == "rgb(255, 0, 0)") {
                console.log("goal cell")
                return;
            }
            if (element.style.backgroundColor == "green") {
                element.setAttribute("style", "background-color: white");
            }
            else {
                event.target.setAttribute("style", "background-color: green")
                startCell = event.target.id.split("-");
                console.log(event.target);
            }
        }
    });

    // Right click event listener to set / change goal cell
    document.getElementById("container").addEventListener("contextmenu", function (e) {
        if ("buttons" in e) {
            console.log(e.button)
            if (e.button == 2) {
                console.log("right click")

            }
        }

        let bg = window.getComputedStyle(e.target).backgroundColor;
        console.log(bg)
        if (bg == "rgb(0, 0, 255)") {
            console.log("blue cell")
            e.preventDefault();
            return;
        }
        if (e.target && e.target.className == "cell") {
            let element = e.target;

            if (element.getAttribute("backgroundColor") == "red") {
                console.log("its red");
            }

            if (goalCell) {
                if (goalCell == element) {
                    // remove color and goalcell
                    element.setAttribute("style", "background-color: white");
                    goalCell = undefined;
                } else {
                    goalCell.setAttribute("style", "background-color: white");
                    element.setAttribute("style", "background-color: red");
                    console.log(window.getComputedStyle(element).backgroundColor);

                    goalCell = element.id.split("-");
                }
            } else {
                // goalCell does not exist
                element.setAttribute("style", "background-color: red");
                goalCell = element.id.split("-");
            }


        }
        e.preventDefault();
    });

    document.body.onmousedown = function (event) {
        if (event.button == 0) {
            console.log("mouse down")
            isMouseDown = true;
            event.preventDefault();
        }

    }
    document.body.onmouseup = function (event) {
        if (event.button == 0) {
            console.log("mouse up")
            isMouseDown = false;
        }
    }

    resetButton.addEventListener('click', () => {
        console.log("clicked")
        let cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.style.backgroundColor = "white";

        })
    })

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

})()