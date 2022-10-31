// 3rd Question
let array = [1, 3, 7];

function add_all(arr, n) {
    let temp_arr = [];
    for (let i of arr) {
        temp_arr.push(i + n);
    }
    return temp_arr;
}

console.log(add_all(array, 2))

//[ 3, 5, 9 ]
