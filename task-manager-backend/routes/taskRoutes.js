const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Lấy danh sách tất cả công việc
router.get('/', taskController.getAllTasks);

// Thêm công việc mới
router.post('/', taskController.addTask);

module.exports = router;
