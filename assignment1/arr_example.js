// 4th question

// declaring array
const arr = [
    'ABCDEF',
    'CBCDEFHGJ',
    'ERGREOIBFERG',
    'SKI',
    'SDGPQEIVN',
    'PQW',
    'A',
    'BC',
    'DEF',
    'POIQWVD'
];

// using filter
function filtering(string) {
    return string.length < 6;
}

console.log(arr.filter(filtering));
console.log()

// using map
function through_map(string) {
    if (string.length < 6) {
        return string;
    }
}

for (let i of arr.map(through_map)) {
    if (i) {
        console.log(i);
    }
}
console.log()

// using forEach
function through_forEach(string) {
    if (string.length < 6) {
        console.log(string)
    }
}

arr.forEach(through_forEach);