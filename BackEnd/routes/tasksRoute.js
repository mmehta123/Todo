const TasksModel = require('../models/tasksModel.js');
const express = require('express');
const router = new express.Router();

//Post New Task
router.post("/", async (req, res) => {
    try {
        const task = await TasksModel.create(req.body);
        return res.status(200).json(task);
    } catch (e) {
        return res.status(401).json(e);
    }
});

// Get User's All Tasks
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await TasksModel.find({ creator: id });
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json(error);
    }
});
// Delete Task
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TasksModel.findByIdAndDelete(id);
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json(error);
    }
});
// Update Task
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TasksModel.findById(id);
        task.isDone = !task.isDone;
        task.save();
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;