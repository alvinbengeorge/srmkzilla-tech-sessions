const fs = require('fs');
const path = require('path');


// https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json
let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "Movies.json")));

for (let i = 0; i < data.length; i++) {
    data[i]["rating"] = 0;
}

fs.writeFileSync(path.resolve(__dirname, "Movies.json"), JSON.stringify(data, null, "\t"));
