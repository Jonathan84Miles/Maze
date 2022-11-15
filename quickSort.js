 import { changeElementColor, swapElements } from "./common.js";
// import { changeElementColor } from "./common.js";

let pivotStates = [];
let setup = false;
export async function quickSort(arr, start, end){
    if(start >= end){
        return;
    }
    if(setup == false){
        for(let i = 0; i < arr.length; i++){
            pivotStates[i] = -1;
            setup = true;
        }
    }
    
    let index = await partition (arr, start, end);
    changeElementColor(index, "blue");
await Promise.all([quickSort(arr, start, index -1),quickSort(arr, index +1, end)])

}

async function partition(arr, start, end){

    for(let i = start; i < end;i++){
        changeElementColor(i, "green")
    }
    let pivotIndex = start;
    let pivotValue = arr[end];
    changeElementColor(pivotIndex, "red");

    for(let i = start; i<end; i++){
        if(arr[i] < pivotValue){
            // swap
            await swap(arr,i,pivotIndex);
            swapElements(i, pivotIndex);
            changeElementColor(pivotIndex, "blue")
            pivotIndex++;
            changeElementColor(pivotIndex, "red");
        }
    }
   await swap(arr,pivotIndex,end);
    swapElements(pivotIndex,end);

    for(let i = start; i < end;i++){
        if(i != pivotIndex){
             changeElementColor(i, "blue");
        }
      
    }
return pivotIndex;
}

async function swap(arr, a, b){
    await sleep(10);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

}

function sleep(ms){
 return new Promise(resolve => setTimeout(resolve, ms));
} 
// async function partition(arr, low, high)
//     {
//         let temp;
//         let pivot = arr[high];
  
//         // index of smaller element
//         let i = (low - 1);
//         for (let j = low; j <= high - 1; j++) {
//             // If current element is smaller
//             // than or equal to pivot
//             if (arr[j] <= pivot) {
//                 i++;
  
//                 // swap arr[i] and arr[j]
             
//                 swapElements(i,j);
//                 temp = arr[i];
//                 arr[i] = arr[j];
//                 arr[j] = temp;

        
//             }
//         }
  
//         // swap arr[i+1] and arr[high]
//         // (or pivot)
  
//         swapElements(i+1, high);
//         temp = arr[i + 1];
//         arr[i + 1] = arr[high];
//         arr[high] = temp;
  
//         return i + 1;
//     }
  
//     /* A[] --> Array to be sorted,
//     l --> Starting index,
//     h --> Ending index */
//     export function quickSort(arr, l, h)
//     {
//         // Create an auxiliary stack
//         let stack = new Array(h - l + 1);
//         stack.fill(0);
  
//         // initialize top of stack
//         let top = -1;
  
//         // push initial values of l and h to
//         // stack
//         stack[++top] = l;
//         stack[++top] = h;
  
//         // Keep popping from stack while
//         // is not empty
//         while (top >= 0) {
//             // Pop h and l
//             h = stack[top--];
//             l = stack[top--];
  
//             // Set pivot element at its
//             // correct position in
//             // sorted array
//             let p = partition(arr, l, h);
  
//             // If there are elements on
//             // left side of pivot, then
//             // push left side to stack
//             if (p - 1 > l) {
//                 stack[++top] = l;
//                 stack[++top] = p - 1;
//             }
  
//             // If there are elements on
//             // right side of pivot, then
//             // push right side to stack
//             if (p + 1 < h) {
//                 stack[++top] = p + 1;
//                 stack[++top] = h;
//             }
//         }
//     }

//     const delay = ms => new Promise(res => setTimeout(res, ms));