const express = require('express');
const router = express.Router();
const { getAllTasks, createTask, getTasks, updateTask, deleteTasks } = require('../controller/tasks');
const app = express();


// routers
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTasks).patch(updateTask).delete(deleteTasks);


// exporting modules
module.exports = router;