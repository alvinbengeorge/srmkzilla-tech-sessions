// 1st Question
const triangle = require("./triangle");

function reverse_string(string) {
    let new_string = "";
    for (let i of string) {
        new_string = i + new_string;
    }
    return new_string;
}

let power = (integer, power) => integer ** power

console.log(reverse_string("hello world"));
console.log(power(2, 7))
triangle("hello")

/*
dlrow olleh
128
h
he
hel
hell
hello
*/