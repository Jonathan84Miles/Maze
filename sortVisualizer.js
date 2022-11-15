import { bubbleSort } from "./bubbleSort.js";
import { insertionSort } from "./insertionSort.js";
import { selectionSort } from "./selectionSort.js";
import { mergeSort } from "./mergeSort.js";
import { quickSort } from "./quickSort.js";

(function () {
    const containerWidth = 1200;
    const range = document.getElementById("sizeSlider");
    const sortBtn = document.getElementById("sortBtn");

    let arraySize = 55;
    let array = generateArray(arraySize);

    createBars();

    sortBtn.addEventListener('click', function () {
        switch (document.getElementById("algorithmSelect").value) {
            case "bubbleSort":
                bubbleSort(array);
                break;

            case "insertionSort":
                insertionSort(array);
                break;

            case "selectionSort":
                selectionSort(array);
                break;

            case "mergeSort":
                console.log("merge sort selected");
                mergeSort(array, arraySize);
                break;

            case "quickSort":
                console.log("quick sort selected");
                quickSort(array, 0, arraySize - 1);
                break;


            default:
        }
    });

    range.addEventListener('input', function () {
        arraySize = range.value;
        updateArray();

        console.log(range.value);
    });

    function updateArray() {
        array = generateArray(arraySize);
        removeBars();
        createBars();
    }

    function removeBars() {
        const container = document.getElementById("barContainer");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    function generateArray(size) {
        let newArray = [];
        for (let i = 0; i < size; i++) {
            newArray[i] = Math.ceil(Math.random() * 700);
        }
        return newArray;
    }

    function createBars() {
        const container = document.getElementById("barContainer");
        console.log(arraySize);
        for (let i = 0; i < arraySize; i++) {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.setAttribute("id", "bar" + i);
            bar.style.width = containerWidth / arraySize + "px";
            bar.style.height = array[i] + "px";
            bar.style.alignSelf = "flex-end";
            bar.style.backgroundColor = "blue";
            bar.style.marginRight = "1px";
            bar.style.marginLeft = "1px";
            bar.style.display = "inline-block"
            container.append(bar);
        }
    }
})();
