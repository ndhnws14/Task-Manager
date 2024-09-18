const express = require('express');
const authRoutes = require('./routes/authRouters');
const taskRoutes = require('./routes/taskRoutes')
const sequelize = require('./config/db');

const app = express();
const PORT = 5000;

// Middleware để parse JSON
app.use(express.json());

// Đăng ký các routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);

    // Kết nối cơ sở dữ liệu
    sequelize.sync()
        .then(() => console.log('Cơ sở dữ liệu đã được đồng bộ'))
        .catch((err) => console.error('Lỗi đồng bộ cơ sở dữ liệu:', err));
});
