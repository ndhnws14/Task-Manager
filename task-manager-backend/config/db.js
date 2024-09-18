const { Sequelize } = require('sequelize');

// Kết nối với cơ sở dữ liệu MySQL thông qua Sequelize
const sequelize = new Sequelize('task_management', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,  // Tắt logging các truy vấn SQL
});

// Kiểm tra kết nối với MySQL
sequelize.authenticate()
    .then(() => {
        console.log('Kết nối MySQL thành công');
    })
    .catch(err => {
        console.error('Không thể kết nối đến MySQL:', err);
    });

module.exports = sequelize;