import { swapElements } from "./common.js";
import { changeElementColor } from "./common.js";

let speedSlider = document.getElementById("speedSlider");
let speed = speedSlider.value;

export async function insertionSort(inputArr) {
    console.log("Insertion sort");
    let n = inputArr.length;

    changeElementColor(0, "green");
    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = inputArr[i];
        let currentIndex = i;
        // The last element of the sorted subarray
        let j = i - 1;
        changeElementColor(currentIndex, "red");
            await delay(speed);

        while ((j > -1) && (current < inputArr[j])) {

        
            inputArr[j + 1] = inputArr[j];
            inputArr[j] = current;
            swapElements(j + 1, j);

            changeElementColor(currentIndex, "green");
            currentIndex--;
            changeElementColor(currentIndex, "red");

            await delay(speed);
    

            //  element1.style.backgroundColor = "blue";           
            // element2.style.backgroundColor = "blue";
            j--;
        }
        changeElementColor(j + 1, "green");
        inputArr[j + 1] = current;
    }
    console.log(inputArr);
    return inputArr;
}

speedSlider.addEventListener('input', () => {
    speed = speedSlider.value;
});

const delay = ms => new Promise(res => setTimeout(res, ms));