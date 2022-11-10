const fs = require("fs");
const path = require("path");
const express = require("express");
const admin = require("./admin.json")

app = express();
app.use(express.json());

let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "Movies.json")));

function saveToFile() {
    fs.writeFileSync(path.resolve(__dirname, "Movies.json"), JSON.stringify(data, null, "\t"));
}
app.get("/movies", (req, res) => {
    res.send(data);
});

app.get("/movies/:id", (req, res) => {
    let id = req.params.id;
    if (id in data) {
        res.send(data[id]);
        saveToFile();
    } else {
        res.send({ "message": "This movie does not exist" });
    }
});

app.put("/upvote/:id", (req, res) => {
    let id = req.params.id;
    if (id in data) {
        data[id]["rating"] += 1;
        res.send(data[id]);
        saveToFile();
    } else {
        res.send({ "message": "This movie does not exist" });
    }
});

app.put("/downvote/:id", (req, res) => {
    let id = req.params.id;
    if (id in data) {
        data[id]["rating"] -= 1;
        res.send(data[id]);
        saveToFile();
    } else {
        res.send({ "message": "This movie does not exist" });
    }
});


app.listen(8080);