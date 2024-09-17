const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); // Định nghĩa các route cho công việc
const db = require('./config/db'); // Kết nối cơ sở dữ liệu

const app = express();

// Middleware
app.use(cors());  // Cho phép truy cập từ ReactJS (frontend)
app.use(express.json());  // Để đọc dữ liệu JSON từ các request

// Định nghĩa route
app.use('/tasks', taskRoutes);

// Xử lý route không tồn tại
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route không tồn tại!' });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
