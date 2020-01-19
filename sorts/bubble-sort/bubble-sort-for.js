// Bubble Sort

const arr = [3, 45, 67, 98, 78, 25, 17];

/*
    Pseudo Code ici                 
*/

const bubbleSort = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    //let change = false;
    for (let j = 0; j < arr.length - (i + 1); j++) {
      if (arr[j] > arr[j + 1]) {
        //change = true;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    //if (!change) break;
  }
  return arr;
};

console.log("-----before sorting-----");
console.log(arr);
console.log("-----after sorting-----");
console.log(bubbleSort(arr));

