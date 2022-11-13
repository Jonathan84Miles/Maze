export function recursiveDivision(board, width, height) {
    const HORIZONTAL = 1, VERTICAL = 2;
    const S = 1, E = 2;

    divide(board, 0, 0, width, height, chooseOrientation(width, height));

    function divide(board, x, y, width, height, orientation) {
        let horizontal = orientation == HORIZONTAL;
        let wx, wy, px, py, dx, dy;
        let length, dir;
        let nx, ny;
        let w, h;

        if (width < 2 || height < 2) return;

        // Get wall start coords
        wx = x + (horizontal ? 0 : getRandomInt(0, width - 2));
        wy = y + (horizontal ? getRandomInt(0, height - 2) : 0);
        console.log("x,y",wx, wy)

        // Get coords for the passage
        px = wx + (horizontal ? getRandomInt(0, width) : 0);
        py = wy + (horizontal ? 0 : getRandomInt(0, height));

        // Get the direction the wall will be drawn in
        dx = horizontal ? 1 : 0
        dy = horizontal ? 0 : 1

        // Get length of the wall
        length = horizontal ? width : height
        console.log("length", length)
        // Get direction perpendicular to the wall
        dir = horizontal ? S : E

        for (let i = 0; i < length; i++) {
            if (wx != px || wy != py) {
                console.log(wx, wy)
                board[wy][wx] += dir;
                document.getElementById(wx + "-" + wy).style.backgroundColor = "black"
            }
        }

        // Get new x and y values
        nx = x;
        ny = y;
        w, h = horizontal ? [width, y + height - wy - 1] : [x + width - wx - 1, height];
        //  divide(board,nx,ny,w,h,chooseOrientation(w,h));
    }

    function chooseOrientation(width, height) {
        if (width < height) {
            return HORIZONTAL;
        } else if (height < width) {
            return VERTICAL;
        } else {
            getRandomInt(1, 2) == 0 ? HORIZONTAL : VERTICAL
        }
    }

    function getRandomInt(min, max) {
        let rand = Math.floor(Math.random() * (max - min + 1) + min)
        console.log(rand)
        return rand
    }

}


