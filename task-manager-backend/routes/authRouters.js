const express = require('express');
const { register, login } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Đăng ký
router.post('/register', register);

// Đăng nhập
router.post('/login', login);

// Một route yêu cầu xác thực JWT (ví dụ)
router.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Bạn có quyền truy cập vào route này', user: req.user });
});

module.exports = router;
