const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');

//Tạo công việc mới
exports.createTask = [
    // Middleware kiểm tra tính hợp lệ
    [
        check('title').isLength({ min: 3 }).withMessage('Tiêu đề phải có ít nhất 3 ký tự'),
        check('description').optional().isLength({ max: 500 }).withMessage('Mô tả không được vượt quá 500 ký tự'),
        check('due_date').optional().isISO8601().withMessage('Ngày đến hạn không hợp lệ'),
        check('status').optional().isIn(['pending', 'in-progress', 'done']).withMessage('Trạng thái không hợp lệ'),
    ],
    async (req, res) => {
        // Xử lý các lỗi validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, discription, due_date, status } = req.body;
            try {
                const task = await task.createTask({
                    title,
                    discription,
                    due_date,
                    status,
                    user_id: req.user.id
                });
                res.status(201).json({ message: 'Tạo công việc thành công', task});
            } catch (error) {
                res.status(500).json({ message: 'Lỗi khi tạo công việc', error});
            }
    }
];
//Lấy danh sách công việc
exports.getTasks = async (req, res) => {;
    try {
        const tasks = await Task.findAll({ where: { user_id: req.user.id} });
        res.status(201).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách công việc', error});
    }
}
//Cập nhật công việc
exports.updateTask = async (req,res) => {
    const { id } = req.params;
    const { title, discription, due_date, status } = req.body;
    try {
        const task = await Task.findOne( { where: { id, user_id: req.user.id }} );
        if (!task) {
            return res.status(404).json({ message: 'Không tìm thấy công việc' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.due_date = due_date || task.due_date;
        task.status = status || task.status;

        await task.save();
        res.status(200).json({ message: 'Công việc được cập nhật', task });
    } catch (error) {
        res.status(500).json({ message: 'Cập nhật công việc không thành công', error});
    }
}
//Xóa công việc
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ message: 'Không tìm thấy công việc' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Công việc đã được xóa' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa công việc', error });
    }
}