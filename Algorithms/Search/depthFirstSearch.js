let timer = 10;
export async function depthFirstSearch(x, y, endX, endY, board) {
    initialise(board);
    console.log("start board", board)
    await search(x, y, endX, endY, board);
}
// Cells may be marked visited from the maze generation 
// algorithm so mark all cells unvisited before starting search
function initialise(board){
    for(let i =0; i < board.length;i++){
        for(let j = 0; j < board[0].length;j++){
            board[i][j].isVisited = false;
        }
    }
}

async function search(x, y, endX, endY, board) {
    let stack = [];
    let curr;

    // Add starting cell to stack and mark it visited
    stack.push(([x, y])); 
    board[y][x].isVisited == true;


    while (stack.length > 0) {
        let neighbours;
    
        // Get next cell off of stack and colour it
        curr = stack[stack.length - 1];
        if (curr[0] == x && curr[1] == y) {
            document.getElementById(curr[1] + "-" + curr[0]).style.backgroundColor = "rgb(23, 165, 137)";
        } else {
            document.getElementById(curr[1] + "-" + curr[0]).style.backgroundColor = "rgb(52, 152, 219)";
        }
        await sleep(timer) 

        // Get all unvisited neighbouring cells
        neighbours = getNeighbours(curr[0], curr[1], board);
        if (neighbours.length > 0) {
           
            // For each neighbour
            for (let i = 0; i < neighbours.length; i++) {
                let nx, ny;
                nx = neighbours[i][0];
                ny = neighbours[i][1];
              
                // Return if neighbour is the cell
                if (nx == endX && ny == endY) {
                    console.log(" found end at x", nx, "y", y)
                    return;
                }
           
                // Push neighbour to stack and mark it visited
                stack.push([nx, ny]);
                board[ny][nx].isVisited = true;
            }
        } else {
           
            // If no unvisited neighbours backtrack to previous junction and colour
            let r = stack.pop();
            if (!(curr[0] == x && curr[1] == y)) {
            document.getElementById(r[1] + "-" + r[0]).style.backgroundColor = "rgb(54, 69, 79)";
            }
        }
    }
}

function getNeighbours(x, y, board) {
    let neighbours = [];
    x = Number(x);
    y = Number(y);

    // Up
    if (y + 1 < board.length && board[y + 1][x].isPath == true && board[y + 1][x].isVisited == false) {
        neighbours.push([x, (y + 1)]);

    }

    // Right
    if (x + 1 < board[0].length && board[y][x + 1].isPath == true && board[y][x+1].isVisited == false) {
        neighbours.push([(x + 1), y]);
    }

    // Down
    if (y - 1 > 0 && board[y - 1][x].isPath == true  && board[y - 1][x].isVisited == false) {
        neighbours.push([x, (y - 1)]);
    }

    // Left
    if (x - 1 > 0 && board[y][x - 1].isPath == true && board[y][x - 1].isVisited == false) {
        neighbours.push([(x - 1), y]);
    }
    return neighbours;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
