const arr = [3, 45, 67, 98, 78, 25, 17];

const bubbleSort = arr => {
  let swapped;

  do {
    swapped = false;

    for (var i = 0, len = arr.length; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // affectation par décomposition
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];

        swapped = true;
      }
    }
  } while (swapped);

  return arr;
};

console.log("-----before sorting-----");
console.log(arr);
console.log("-----after sorting-----");
console.log(bubbleSort(arr));
