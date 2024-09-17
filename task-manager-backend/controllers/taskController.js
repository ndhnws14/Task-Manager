const db = require('../config/db');

// Lấy tất cả công việc
exports.getAllTasks = (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// Thêm công việc mới
exports.addTask = (req, res) => {
  const { title, description, due_date, priority } = req.body;
  const sql = 'INSERT INTO tasks (title, description, due_date, priority) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, due_date, priority], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Thêm công việc thành công', taskId: result.insertId });
  });
};
