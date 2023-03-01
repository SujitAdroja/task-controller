// const { findOneAndUpdate } = require('../models/Task');
const Task = require('../models/Task');
const asyncWrapper = require('../middleware/asynWrapper');

const getAllTasks = asyncWrapper(async (req, res) => {

    const task = await Task.find({});
    res.json({ tasks: task });

})

const createTask = asyncWrapper(async (req, res) => {

    const task = await Task.create(req.body);
    res.status(201).json({ task });


    // res.json(req.body);
})

const getTasks = asyncWrapper(async (req, res) => {
    // const { id: taskID } = req.params
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
        return res.status(500).send(`no task with id : ${taskID}`);
    }
    res.status(200).json({ task });

})

const updateTask = asyncWrapper(async (req, res) => {
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true,
        new: true
    });
    if (!task) {
        return res.status(500).send(`no task with id : ${req.params.id}`);
    }
    res.status(200).json({ task });
})

const deleteTasks = asyncWrapper(async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
        return res.status(500).send(`no task with id : ${taskID}`);
    }
    res.status(200).json({ task });
})

module.exports = {
    getAllTasks, createTask, getTasks, updateTask, deleteTasks
}