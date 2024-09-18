const jwt = require('jsonwebtoken');
const secretKey = 'secret';  // Khóa bí mật để mã hóa JWT

// Middleware để xác thực JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Không có token, vui lòng đăng nhập' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();  // Cho phép tiếp tục truy cập vào route
    } catch (err) {
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = verifyToken;
