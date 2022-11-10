import express from "express";
import { nanoid } from "nanoid";
import fs from "fs";
const app = express()
app.use(express.json())


// Task List ID and their Key
let TaskID_Key = {};
// Task ID and tasks
let tasks = {};

function authentication(req, res) {
    if (req.params.id in TaskID_Key) {
        if (TaskID_Key[req.params.id] == req.params.key) {
            return true;
        } else {
            res.send({ "message": "Wrong Key" })
            return false;
        }
    } else {
        res.send({ "message": "This TaskList ID does not exist" })
        return false;
    }
}

function saveToFile() {
    saveKeys();
    fs.writeFile("tasks.json", JSON.stringify(tasks), err => {
        if (err) {
            console.log(err)
        } else {
            console.log("Done")
        }
    })
}

function saveKeys() {
    fs.writeFile("keys.json", JSON.stringify(TaskID_Key), err => {
        if (err) {
            console.log(err)
        } else {
            console.log("Done")
        }
    })
}

// read from file keys.json and tasks.json
fs.readFile("keys.json", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        TaskID_Key = JSON.parse(data);
    }
});

fs.readFile("tasks.json", (err, data) => {  
    if (err) {
        console.log(err)
    } else {
        tasks = JSON.parse(data);
    }
});

app.get("/", function main(req, res) {
    res.send({ "message": "Welcome to API-Tasks ;)" })
})

app.get("/create", function test(req, res) {
    let id = nanoid()
    const key = nanoid()
    TaskID_Key[id] = key;
    tasks[id] = [];
    res.send({ id, key });
    saveToFile()
})

app.get("/tasks/:id/:key/", function taskShow(req, res) {
    if (authentication(req, res)) {
        res.send(tasks[req.params.id])
        saveToFile();
    }

})

app.post("/addTask/:id/:key", function addTask(req, res) {
    console.log(Date.now())
    if (authentication(req, res)) {
        let taskBody = req.body
        if (!Array.isArray(taskBody)) {
            taskBody = [taskBody];
        }
        for (let i of taskBody) {
            if (!i.task) { continue; }
            tasks[req.params.id].push(
                {
                    "task": i.task,
                    "time": Date.now(),
                    "completeBy": i.completeBy,
                    "completed": false
                }
            )
        }
        res.send(tasks[req.params.id])
        saveToFile();
    }
})

app.get("/delete/:id/:key/:index", function deleteTask(req, res) {
    if (authentication(req, res)) {
        const index = req.params.index;
        if (index>tasks[req.params.id]) {
            res.send({"message": "Index value is higher than the length of the TaskList"})
            return
        }
        tasks[req.params.id].splice(index, 1)
        res.send(tasks[req.params.id])
        saveToFile();
    }
})

app.listen(8080, () => {console.log("Starting Server");});

