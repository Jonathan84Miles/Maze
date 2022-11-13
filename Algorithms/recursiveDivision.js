export async function recursiveDivision(board, width, height) {
    let horizontal = true;
    // Create 1 cell wide black border around grid

    // top
    for (let col = 0; col < width; col++) {
        let element = document.getElementById(0 + "-" + col);
        //  console.log(element)
        element.style.backgroundColor = "black";
        await sleep(10)
    }

    // right (top down)
    for (let row = 0; row < height; row++) {
        //   console.log(width - 1)
        let element = document.getElementById(row + "-" + (width - 1));
        //    console.log(element)
        element.style.backgroundColor = "black";
        await sleep(10)
    }

    // Bottom (right to left)
    for (let col = width - 1; col >= 0; col--) {
        let element = document.getElementById(height - 1 + "-" + col);
        //     console.log(element)
        element.style.backgroundColor = "black";
        await sleep(10)
    }

    // left (bottom to top)
    for (let row = height - 1; row >= 0; row--) {
        //   console.log("row", row)
        let element = document.getElementById(row + "-" + 0);
        //   console.log(element)
        element.style.backgroundColor = "black";
        await sleep(10)
    }

    await divide(1, 1, height - 1, width - 1, board);
}

async function divide(startX, startY, height, width, board) {
 //    https://gist.github.com/jnx/5babc722ce4bcceba9d6c4491a49a593
    console.log("divide called")
    let secondTimer = 200;
    let sleepTime = 1;
    await sleep(2000);
    let height2, width2, x2, y2, newHeight, newWidth;
    let newWall, newHole;

    let orientation;

    if (width > height) {
        orientation = "horizontal";
    }
    else {
        orientation = "vertical";
    }

    console.log("\nOrientation is", orientation)
    console.log("startX", startX);
    console.log("startY", startY);
    console.log("width", width);
    console.log("height", height);

    // If orientation is horizontal ( landscape ) draw vertical wall 
    if (orientation == "horizontal") {
        console.log(" Entering horizontal if statement")
        if (width < 5 || height <=2) {
            console.log("width less than 5, returning")
            return;
        }
        await colorRegion(startX, startY, width, height, "red");
        // Get random even number between x+2 and width-3
        console.log("generating random numbers")

        newWall = getRandomEven(startX + 1, width - 3);
        console.log("Got random even number")

        newHole = getRandomOdd(startY, (startY + height - 1));
        console.log("got Random odd number")

        await colorRegion(startX, startY, width, height, "white");
        // Draw Line
        console.log("Drawing line from ", startY, " to ", (startY + height - 1));
        for (let i = startY; i < (startY + height - 1); i++) {
            document.getElementById(i + "-" + newWall).style.backgroundColor = "black";
            await sleep(sleepTime)
        }

        // Draw hole
        document.getElementById(newHole + "-" + newWall).style.backgroundColor = "white";
        await sleep(sleepTime)

        // Left section bounds
        newHeight = height;
        newWidth = newWall - startX + 1;
        //  document.getElementById(height + "-" + width).style.backgroundColor = "red";

        // Right section bounds
        y2 = startY;
        x2 = newWall + 1;
        height2 = height;
        width2 = startX + width - newWall - 1;


    }

    // If orientation is vertical ( portrait ) draw horizontal wall 
    if (orientation == "vertical") {
        console.log(" Entering vertical if statement")
        console.log("vertical")
        if (height < 5 || width <=2) {
            console.log("height less than 5, returning")
            return;
        }

        await colorRegion(startX, startY, width, height, "red");

        // Get random even number between x+2 and width-3
        console.log("generating random numbers")
        newWall = getRandomEven(startY + 1, height - 3);
        newHole = getRandomOdd(startX, (startX + width - 1));
        console.log("got Random numbers")

        await colorRegion(startX, startY, width, height, "white");
        // Draw Line
        console.log("Drawing line from ", startX, " to ", (startX + width-1));
        for (let i = startX; i < (startX + width - 1); i++) {
            console.log("Entering draw line loop")
            document.getElementById(newWall + "-" + i).style.backgroundColor = "black";
            await sleep(sleepTime)
        }
       
        // Draw hole
        document.getElementById(newWall + "-" + newHole).style.backgroundColor = "white";
        await sleep(sleepTime)
        // Top section bounds
        newHeight = newWall - startY + 1;
        newWidth = width;
        // document.getElementById(height + "-" + width).style.backgroundColor = "red";

       // Bottom Section bounds
        y2 = newWall;
        x2 = startX;
        height2 = startY + height - newWall;
        width2 = width;

    }


  // await divide(x2, y2, height2, width2, board);
    console.log("Starting to recurse right")
    sleep(secondTimer)
    await divide(startX, startY, newHeight, newWidth, board);
}


function getRandomEven(min, max) {
    console.log(min)
    console.log(max)
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    while (rand % 2 != 0) {
        rand = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("even", rand);
    }
    return rand;
}

function getRandomOdd(min, max) {
    console.log(min)
    console.log(max)
    let rand = Math.floor(Math.random() * (max - min + 1) + min);

    while (rand % 2 == 0) {

        rand = Math.floor(Math.random() * (max - min + 1) + min);
        console.log("odd", rand);
    }
    return rand;
}

async function colorRegion(x, y, width, height, color) {
    // console.log("coloring")
    // console.log("y", y)
    // console.log("x", x)
    // console.log("height", height)
    // console.log("width", width);

    await sleep(200);

    for (let i = y; i < height; i++) {
        for (let j = x; j < (x + width) - 1; j++) {
        //    console.log("coloring", i, j)
            document.getElementById(i + "-" + j).style.backgroundColor = color;
        }
    }
    await sleep(200);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}