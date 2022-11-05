import prompt from "prompt-sync";
import fs from "fs";

const input = prompt()
let arr = [];

let text = input("Enter a sentence:");


fs.writeFile("text.txt", text, err  => {
    if ({err}) {
        console.log(err)
    } else {
        console.log("Done")
    }
})
