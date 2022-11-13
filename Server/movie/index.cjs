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
    outputData = {};
    for (let i of data) {
        outputData[i.id] = i.title
    }
    res.send(outputData);
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

app.delete("/delete/:id", (req, res) => {
    let id = req.params.id;
    if (id in data) {        
        if (req.headers.token === admin.adminToken) {
            delete data[id];
            res.send({ "message": "Movie deleted" });
            saveToFile();
        } else {
            res.send({ "message": "You are not authorized to delete this movie" });
        }
    } else {
        res.send({ "message": "This movie does not exist" });
    }
});

app.patch("/update/:id", (req, res) => {
    let id = req.params.id;
    if (id in data) {
        if (req.headers.token === admin.adminToken) {
            data[id] = req.body;
            res.send(data[id]);
            saveToFile();
        } else {
            res.send({ "message": "You are not authorized to edit this movie" });
        }
    } else {
        res.send({ "message": "This movie does not exist" });
    }
});

app.listen(8080);