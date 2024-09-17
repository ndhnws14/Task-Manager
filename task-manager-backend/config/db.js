const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'task_management',
});

db.connect((err) => {
  if (err) {
    console.log('Không thể kết nối đến MySQL:', err);
  } else {
    console.log('Kết nối MySQL thành công');
  }
});

module.exports = db;
