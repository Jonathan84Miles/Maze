const timer = 1;
const timer2 = 500;
export async function recursiveDivision(width, height, board) {
    await initialise(width, height, board);

    await divide(1, width - 2, 1, height - 2);

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
    console.log("\nstart");
    console.log("Orientation", orientation);
    console.log("startX", startX, "startY", startY)
    console.log("endX", endX, "endY", endY);
    console.log("width", width, "height", height);


    if (orientation == "vertical") {
        // Check region size can be split virtically
        if (width < 3 || height < 2) {
            console.log("exiting")
            return;
        }


        // color region 
        // await colorRegion(startX, endX, startY, endY, board, "red");
        // await sleep(timer2);
        // await colorRegion(startX, endX, startY, endY, board, "white");

        // draw wall
        wallIndex = getRandomEvenInt(startX, endX);

        let min = 10000000, max = 0;
        for (let i = 0; i < 10000; i++) {
            let rand = getRandomEvenInt(startX, endX);
            if (rand > max) {
                max = rand;
            }
            if (rand < min) min = rand;
        }
        console.log("result", min, max)
        holeIndex = getRandomOddInt(startY, endY);

        await drawVerticalWall(wallIndex, holeIndex, startY, endY, board);

        // Left bounds
        newEndY = endY;
        newEndX = wallIndex - 1;

        // Set bounds for new right region
        newStartX = wallIndex + 1;
        newStartY = startY;
        newEX = endX;
        newEY = endY;

        // // color left region
        // await colorRegion(startX, newEndX, startY, newEndY, board, "red");
        // await sleep(timer2);
        // await colorRegion(startX, newEndX, startY, newEndY, board, "white");

        // // color right region
        // await colorRegion(newStartX, endX, newStartY, endY, board, "red");
        // await sleep(timer2);
        // await colorRegion(newStartX, endX, newStartY, endY, board, "white");

    }

    if (orientation == "horizontal") {
        if (width < 2 || height < 3) {
            console.log("exiting")
            return;
        }

        // color region
        // await colorRegion(startX, endX, startY, endY, board, "red");
        // await sleep(timer2);
        // await colorRegion(startX, endX, startY, endY, board, "white");

        // draw wall
        wallIndex = getRandomEvenInt(startY, endY);
        console.log("WallIndex", wallIndex)
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

        // // Color top region
        // await colorRegion(startX, endX, startY, newEndY, board, "red");
        // await sleep(timer2);
        // await colorRegion(startX, endX, startY, newEndY, board, "white");
        // await sleep(timer2);

        // // color bottom region
        // await colorRegion(startX, endX, newStartY, endY, board, "red");
        // await sleep(timer2);
        // await colorRegion(startX, endX, newStartY, endY, board, "white");
    }
    // pass left and top args
    console.log("recursing left")
      await divide(startX, newEndX, startY, newEndY, board)

    // pass right and down args
    console.log("recursing right")
    await divide(newStartX, endX, newStartY, endY, board);

}
function getRegionDimensions(startX, endX, startY, endY) {
    let width = endX - startX + 1;
    let height = endY - startY + 1;
    return [width, height];

}
async function drawHorizontalWall(wallIndex, holeIndex, startX, endX, board) {
    let wallLength = endX - startX + 1;

    console.log("\nwall length", wallLength);
    console.log("wall start x", startX);
    console.log("endX", endX);
    console.log("wall Index", wallIndex)
    let cell;
    for (let i = startX; i <= endX; i++) {
        if (i == holeIndex) continue;
        cell = document.getElementById(wallIndex + "-" + i);
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }

}

async function drawVerticalWall(wallIndex, holeIndex, startY, endY, board) {
    let wallHeight = endY - startY + 1;
    let cell;
    console.log("wallIndex", wallIndex)
    for (let i = startY; i <= endY; i++) {
        if (i == holeIndex) continue;
        cell = document.getElementById(i + "-" + wallIndex);
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }
}

function getOrientation(startX, endX, startY, endY) {
    let width = endX - startX + 1;
    console.log("width", width);
    let height = endY - startY + 1;
    console.log("height", height);
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
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }

    // Right
    for (let i = 0; i < height; i++) {
        let cell, col = width - 1;
        cell = cell = document.getElementById(i + "-" + col);
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }

    // Bottom
    for (let i = width - 1; i >= 0; i--) {
        let cell, row = height - 1;
        cell = cell = document.getElementById(row + "-" + i);
        cell.style.backgroundColor = "black";
        await sleep(timer);
    }

    // Left
    for (let i = height - 1; i >= 0; i--) {
        let cell, col = 0;
        cell = cell = document.getElementById(i + "-" + col);
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