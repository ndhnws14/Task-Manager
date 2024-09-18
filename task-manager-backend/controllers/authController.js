const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const secretKey = 'secret'; //khóa bí mật để mã hóa JWT

//Register
exports.register = [
    // Middleware kiểm tra tính hợp lệ
    [
        check('email').isEmail().withMessage('Email không hợp lệ'),
        check('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { username, email, password } = req.body;

        try {
            //Kiểm tra email có tồn tại hay chưa
            const existingUser = await User.findOne({ where: { email }});

            if(existingUser){
                return res.status(400).json({ message: 'Email đã được sử dụng' });
            }

            //Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);

            //Tạo người dùng mới
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            });

            res.status(201).json({ message: 'Đăng kí thành công', user});
        }catch( error ){
            res.status(500).json({ message: 'Lỗi máy chủ', error});
        }
    }
];

//Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //Tìm người dùng email
        const user = await User.findOne({ where: email });
        if(!user){
            return res.status(400).json({ message: 'Email không tồn tại'});
        }

        //Kiểm tra mật khẩu
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(400).json({ message: 'Mật khẩu không đúng' });
        }

        //Tạo jwt token
        const token = jwt.sign({ id: user.id, email: user.email}, secretKey, {expiresIn: '1h'});

        res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ', error});
    }
}