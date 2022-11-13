//import { recursiveDivision } from "./Algorithms/rd.js"
import { primsAlgorithm } from "./Algorithms/primsAlgorithm.js"
import { recursiveBacktracking } from "./Algorithms/recursiveBacktracking.js";
import { recursiveDivision } from "./Algorithms/recursiveDivision.js"
(function setup() {
    let width, height;
    console.log("here")
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
                colArray[j] = 0;

                const cell = document.createElement('div');
                cell.id = i + "-" + j;
                cell.className = "cell";
                row.appendChild(cell);
            }
            board.push(colArray);

        }
        console.log(board);
    }



    // Maze button listeners
    document.getElementById("maze").onclick = function(event){
       recursiveDivision(board[0].length, board.length, board);
    };

    // Prims button listener
    document.getElementById("prims").onclick = function(event){
        primsAlgorithm(board, width, height);
    }

    // Recursive Backtracking listener
    document.getElementById("recursiveBacktracking").onclick = function(event){
        console.log("clicked")
        recursiveBacktracking(board[0].length, board.length, board);
    }

    document.getElementById("container").addEventListener('mouseover', function (event) {
        // need to check that it is left button down
        // currently works with right button

        // Also need to stop color applying to the container div

        // Also need to prevent it from overwriting the goal cell
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
            if (element.style.backgroundColor == "blue") {
                element.setAttribute("style", "background-color: white");
            }
            else {
                event.target.setAttribute("style", "background-color: blue")
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
                    goalCell = element;
                }
            } else {
                // goalCell does not exist
                element.setAttribute("style", "background-color: red");
                goalCell = element;
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


})()