import { swapElements } from "./common.js";
import { changeElementColor } from "./common.js";

let speedSlider = document.getElementById("speedSlider");
let speed = speedSlider.value;

export async function mergeSort(arr, n) {

    // For current size of subarrays to
    // be merged curr_size varies from
    // 1 to n/2
    var curr_size;

    // For picking starting index of
    // left subarray to be merged
    var left_start;

    // Merge subarrays in bottom up
    // manner. First merge subarrays
    // of size 1 to create sorted
    // subarrays of size 2, then merge
    // subarrays of size 2 to create
    // sorted subarrays of size 4, and
    // so on.
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {

        // Pick starting point of different
        // subarrays of current size
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            // Find ending point of left
            // subarray. mid+1 is starting
            // point of right
            var mid = Math.min(left_start + curr_size - 1, n - 1);

            var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

            // Merge Subarrays arr[left_start...mid]
            // & arr[mid+1...right_end]
      
            var i, j, k;
            var n1 = mid - left_start + 1;
            var n2 = right_end - mid;

            /* create temp arrays */
            var L = Array(n1).fill(0);
            var R = Array(n2).fill(0);

            /*
             * Copy data to temp arrays L and R
             */
            for (i = 0; i < n1; i++)
                L[i] = arr[left_start + i];
            for (j = 0; j < n2; j++)
                R[j] = arr[mid + 1 + j];

            /*
             * Merge the temp arrays back into arr[l..r]
             */
            i = 0;
            j = 0;
            k = left_start;
            while (i < n1 && j < n2) {
                if (L[i] <= R[j]) {
                    changeElementColor(k, "red");
                    await delay(speed);
                    changeElementHeight(k, L[i]);
                    changeElementColor(k, "blue");
                    await delay(speed);

                    arr[k] = L[i];
                    i++;
                } else {
                    changeElementColor(k, "red");
                    await delay(speed);
                    changeElementHeight(k, R[j]);
                    changeElementColor(k, "blue");
                    await delay(speed);
                    arr[k] = R[j];
                    j++;
                }
                k++;
            }

            /*
             * Copy the remaining elements of L, if there are any
             */
            while (i < n1) {
                
                await delay(speed);
                changeElementHeight(k, L[i]);
                await delay(speed);
                arr[k] = L[i];
                i++;
                k++;
            }

            /*
             * Copy the remaining elements of R, if there are any
             */
            while (j < n2) {
                await delay(speed);
                changeElementHeight(k, R[j]);
                await delay(speed);
                arr[k] = R[j];
                j++;
                k++;
            }

        }
    }
    console.log(arr);
}
function changeElementHeight(i, newHeight) {
    const current = document.getElementById("bar" + i);
    current.style.height = newHeight + "px";
}

speedSlider.addEventListener('input', () => {
    speed = speedSlider.value;
});

const delay = ms => new Promise(res => setTimeout(res, ms));