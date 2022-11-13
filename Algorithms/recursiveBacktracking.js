export function recursiveBacktracking(grid, width, height) {
    let startX = 0, startY = 0;
    let newX, newY;
    const DIRECTIONS = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            document.getElementById(i + "-" + j).style.backgroundColor = "black"
        }
    }
    // turn cell white
    makeCellPath(startX, startY, grid);
    explore(startX, startY, grid, width, height)

    function explore(x, y, grid,width, height) {
        let neighbours = [];
        console.log("width", width)
        console.log("height", height)
        neighbours = getNeighbours(x, y, grid);
        console.log(neighbours)
        // For each neighbour, check if it can be path 
        for (let i = 0; i < neighbours.length; i++) {
            let possibleMoves = [];
            newX = neighbours[i][1];
            newY = neighbours[i][0];
        }
    }

    function getNeighbours(x, y, grid) {
        let neighbours = [];
        for (let i = 0; i < DIRECTIONS.length; i++) {
            let nx = 0;
            let ny = 0;
            ny = y + DIRECTIONS[i][0];
            nx = x + DIRECTIONS[i][1];
            console.log("nx", nx)
            console.log("ny", ny)

            if ((nx >= 0 && ny >= 0) && (nx < width && ny < height)) {
                console.log("here")
                neighbours.push([ny, nx]);
            }
        }
        return neighbours;
    }

    function makeCellPath(x, y, grid) {
        grid[y][x] = 0;
        document.getElementById(y + "-" + x).style.backgroundColor = "white";
    }
}

