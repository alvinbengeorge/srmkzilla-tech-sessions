import express from "express";
import { nanoid } from "nanoid";
const app = express()
app.use(express.json())


// Task List ID and their "password"
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

app.get("/", function main(req, res) {
    res.send({ "message": "Welcome to API-Tasks ;)" })
})

app.get("/create", function test(req, res) {
    let id = nanoid()
    const key = nanoid()
    TaskID_Key[id] = key;
    tasks[id] = [];
    res.send({ id, key });
})

app.get("/tasks/:id/:key/", function taskShow(req, res) {
    if (authentication(req, res)) {
        res.send(tasks[req.params.id])
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
    }
})

app.listen(8080)

