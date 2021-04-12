const arr = [3, 45, 67, 98, 78, 25, 17];


function insertionSort(inputArr) {
        for (let i = 1; i < inputArr.length; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1;
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}


console.log("-----before sorting-----");
console.log(arr);
console.log("-----after sorting-----");
console.log(insertionSort(arr));
