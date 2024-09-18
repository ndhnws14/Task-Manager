const express = require('express');
const taskController = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Tạo công việc mới (POST)
router.post('/tasks', verifyToken, taskController.createTask);

// Lấy danh sách công việc (GET)
router.get('/tasks', verifyToken, taskController.getTasks);

// Cập nhật công việc (PUT)
router.put('/tasks/:id', verifyToken, taskController.updateTask);

// Xóa công việc (DELETE)
router.delete('/tasks/:id', verifyToken, taskController.deleteTask);

module.exports = router;