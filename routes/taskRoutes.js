const express = require('express');
const { createTask, getAllTasks, updateTask, deleteTask, toggleTaskCompletion, getAllUserTasks, fetchAllTaskList, assignTaskToUser } = require('../controllers/taskController');
const router = express.Router();

router.post('/add', createTask);
router.get('/fetch/all-list', getAllTasks);
router.put('/update',updateTask);
router.delete('/delete', deleteTask);
router.get('/toggle', toggleTaskCompletion);
router.get('/fetch/all-user-task', getAllUserTasks);

router.get("/fetch/all-task-list",fetchAllTaskList);

router.post("/assign-task",assignTaskToUser)


module.exports = router;
