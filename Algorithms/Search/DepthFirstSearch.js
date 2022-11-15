let timer = 0;
export async function depthFirstSearch(x, y, endX, endY, board) {
    console.log("start board", JSON.stringify(board))
    await search(x, y, endX, endY, board);

}


async function search(x, y, endX, endY, board) {
    let stack = [];
    let curr;

    stack.push(([x, y])); //Inserting s in stack 
    console.log("stack", stack)
    board[y][x] = 2;  // mark s as visited.
    console.log("x", x, "y", y)

    while (stack.length > 0) {
        let neighbours;

        //Pop a vertex from stack to visit next
        curr = stack[stack.length - 1];

        console.log("curr ", curr)
        if (curr[0] == x && curr[1] == y) {
            document.getElementById(curr[1] + "-" + curr[0]).style.backgroundColor = "green"
        } else {
            document.getElementById(curr[1] + "-" + curr[0]).style.backgroundColor = "blue"
        }
        if(true){
           await sleep(timer) 
        }
        

        neighbours = getNeighbours(curr[0], curr[1], board);
        if (neighbours.length > 0) {
            for (let i = 0; i < neighbours.length; i++) {
                let nx, ny;
                nx = neighbours[i][0];
                ny = neighbours[i][1];
                if (nx == endX && ny == endY) {
                    console.log(" found end at x", nx, "y", y)
                    return;
                }
                console.log(board[ny][nx]);
                stack.push([nx, ny]);
                board[ny][nx] = 2;
                console.log("set to visited", board[ny][nx]);
            }
        } else {
            let r = stack.pop();
            document.getElementById(r[1] + "-" + r[0]).style.backgroundColor = "white"
        }
    }
}

function getNeighbours(x, y, board) {
    let neighbours = [];
    x = Number(x);
    y = Number(y);

    // Up
    if (y + 1 < board.length && board[y + 1][x] == 0) {
        neighbours.push([x, (y + 1)]);

    }

    // Right
    if (x + 1 < board[0].length && board[y][x + 1] == 0) {
        neighbours.push([(x + 1), y]);
    }

    // Down
    if (y - 1 > 0 && board[y - 1][x] == 0) {
        neighbours.push([x, (y - 1)]);
    }

    // Left
    if (x - 1 > 0 && board[y][x - 1] == 0) {
        neighbours.push([(x - 1), y]);
    }

    return neighbours;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
