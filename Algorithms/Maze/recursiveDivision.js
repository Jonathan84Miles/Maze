const timer = 1;
const timer2 = 500;
export async function recursiveDivision(width, height, board) {
    await initialise(width, height, board);
    await divide(1, width - 2, 1, height - 2, board);

    return board;
}
async function divide(startX, endX, startY, endY, board) {

    let orientation;
    let newStartX, newStartY, newEndX, newEndY;
    let wallIndex, holeIndex;
    let width, height;
    let newEX, newEY;
    [width, height] = getRegionDimensions(startX, endX, startY, endY);

    if (width > height) {
        orientation = "horizontal"
    } else {
        orientation = "vertical"
    }

    orientation = getOrientation(startX, endX, startY, endY);

    if (orientation == "vertical") {
        // Return if region can not be divided virtically
        if (width < 3 || height < 2) return;
        

        // get location for wall and its hole then draw
        wallIndex = getRandomEvenInt(startX, endX);
        holeIndex = getRandomOddInt(startY, endY);
        await drawVerticalWall(wallIndex, holeIndex, startY, endY, board);

        // Bounds for new left region
        newEndY = endY;
        newEndX = wallIndex - 1;

        // Bounds for new right region
        newStartX = wallIndex + 1;
        newStartY = startY;
        newEX = endX;
        newEY = endY;
    }

    if (orientation == "horizontal") {
        // Return if region can not be divided horizontally
        if (width < 2 || height < 3) return;
        

        // draw wall
        wallIndex = getRandomEvenInt(startY, endY);
        holeIndex = getRandomOddInt(startX, endX);
        await drawHorizontalWall(wallIndex, holeIndex, startX, endX, board);

        // Set bounds for new top region
        newEndX = endX;
        newEndY = wallIndex - 1;

        // Bottom Bounds
        newStartY = wallIndex + 1;
        newStartX = startX;
        newEX = endX;
        newEY = endY;
    }

    // pass left and top args
    await divide(startX, newEndX, startY, newEndY, board)

    // pass right and down args
    await divide(newStartX, endX, newStartY, endY, board);
}

function getRegionDimensions(startX, endX, startY, endY) {
    let width = endX - startX + 1;
    let height = endY - startY + 1;
    return [width, height];

}

async function drawHorizontalWall(wallIndex, holeIndex, startX, endX, board) {
    let wallLength = endX - startX + 1;
    let cell;
    for (let i = startX; i <= endX; i++) {
        if (i == holeIndex) continue;
        cell = document.getElementById(wallIndex + "-" + i);
        board[wallIndex][i].isPath = false;
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }

}

async function drawVerticalWall(wallIndex, holeIndex, startY, endY, board) {
    let wallHeight = endY - startY + 1;
    let cell;
    for (let i = startY; i <= endY; i++) {
        if (i == holeIndex) continue;
        cell = document.getElementById(i + "-" + wallIndex);
        board[i][wallIndex].isPath = false;
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }
}

function getOrientation(startX, endX, startY, endY) {
    let width = endX - startX + 1;
    let height = endY - startY + 1;
    if (width > height) return "vertical";
    if (height >= width) return "horizontal";
}

async function colorRegion(startX, endX, startY, endY, board, color) {
    let cell;
    for (let i = startY; i <= endY; i++) {
        for (let j = startX; j <= endX; j++) {
            cell = document.getElementById(i + "-" + j);
            cell.style.backgroundColor = color;
        }
    }
}

async function initialise(width, height, board) {
    let cell, row = 0;

    // Top
    for (let i = 0; i < width; i++) {
        cell = document.getElementById(row + "-" + i);
        board[row][i].isPath = false;
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }

    // Right
    for (let i = 0; i < height; i++) {
        let cell, col = width - 1;
        cell = cell = document.getElementById(i + "-" + col);
        board[i][col].isPath = false;
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }

    // Bottom
    for (let i = width - 1; i >= 0; i--) {
        let cell, row = height - 1;
        cell = cell = document.getElementById(row + "-" + i);
        board[row][i].isPath = false;
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }

    // Left
    for (let i = height - 1; i >= 0; i--) {
        let cell, col = 0;
        cell = cell = document.getElementById(i + "-" + col);
        board[i][col].isPath = false;
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }
}

function getRandomOddInt(min, max) {
    if (max % 2 == 0) --max;
    if (min % 2 == 0) ++min;
    return min + 2 * Math.floor((Math.random() * ((max - min) / 2 + 1)));
}

function getRandomEvenInt(min, max) {
    let rand = 1;
    while (rand % 2 != 0) {
        rand = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return rand
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}