export function swapElements(i, j) {
    let element1 = document.getElementById("bar" + i);
    let element2 = document.getElementById("bar" + j);

    let temp = element1.style.height;

    element1.style.height = element2.style.height;
    element2.style.height = temp;
}

export function changeElementColor(i, color){
    let element = document.getElementById("bar" + i);
    element.style.backgroundColor = color;
}
