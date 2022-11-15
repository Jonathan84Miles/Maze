import { swapElements } from "./common.js";
import { changeElementColor } from "./common.js";

let speedSlider = document.getElementById("speedSlider");
let speed = speedSlider.value;

export async function bubbleSort(array) {
    let swapsThisPass = false;

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            changeElementColor(j, "red");
            changeElementColor(j+1,  "red");

            if (array[j] > array[j + 1]) {
                swapsThisPass = true;
                await delay(speed);

                // Swap the elements in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap bar heights
                swapElements(j, j + 1);
            }
            changeElementColor(j, "blue");
            changeElementColor(j+1, "blue");

        }
        changeElementColor((array.length - 1 - i), "green");

        if (!swapsThisPass) {
            // Array is sorted
            // Change color of all bars to green
            for(let i = 0; i < array.length; i++){
                changeElementColor(i, "green")
            }
            return;
        } else {
            swapsThisPass = false;
        }
    }
    console.log(array);
}

speedSlider.addEventListener('input', () => {
    speed = speedSlider.value;
});

const delay = ms => new Promise(res => setTimeout(res, ms));
