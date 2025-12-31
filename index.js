const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const TaskSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});

const Task = mongoose.model("Task", TaskSchema);

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const task = new Task({ title: req.body.title, completed: false });
    await task.save();
    res.json(task);
});

app.put("/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        { completed: req.body.completed },
        { new: true }
    );
    res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
