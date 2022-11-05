import express from "express";

const app = express();
app.use(express.json());

app.get("/", function main(req, res) {
    res.send("Hello world");
    console.log("Request received")
})

app.listen(8080, () => {console.log("Running");});