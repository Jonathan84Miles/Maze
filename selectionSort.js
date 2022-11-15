import { swapElements } from "./common.js";
import { changeElementColor } from "./common.js";

let speedSlider = document.getElementById("speedSlider");
let speed = speedSlider.value;

export async function selectionSort(inputArr) { 

    console.log("selectionSort");
    let n = inputArr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < n; j++){
            if(inputArr[j] < inputArr[min]) {
                min=j; 
            }
         }
         changeElementColor(min, "red");
         changeElementColor(i, "red");
         await delay(speed);  
         if (min != i) {
             // Swapping the elements
             swapElements(i, min);
             let tmp = inputArr[i]; 
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp;      
        }
        changeElementColor(min, "blue");
        changeElementColor(i, "green");
        await delay(speed);  
    }
    console.log(inputArr);
    return inputArr;
}

speedSlider.addEventListener('input', () => {
    speed = speedSlider.value;
});

const delay = ms => new Promise(res => setTimeout(res, ms));