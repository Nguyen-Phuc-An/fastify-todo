import db from '../models/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

if (!process.env.SECRET_KEY) {
    console.error('❌ Missing SECRET_KEY in .env');
    process.exit(1);
}

//hàm băm mật khẩu
const hashPassword = password => bcrypt.hashSync(password,bcrypt.genSaltSync(12))

export const registerService = async ({ username, email, password, isAdmin = false }) => {
    try {
        //Kiểm tra email có trùng hay không
        const user = await db.User.findOne({ where: {email} });
        if (user) return { err: 1, msg: 'Email đã được sử dụng!'};

        // Tạo người dùng mới
        const newUser = await db.User.create({
            username,
            email,
            password: hashPassword(password),
            isAdmin
        });

        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        );

        return { err: 0, msg: 'Đăng ký tài khoản thành công!', token };

    } catch (error) {
        throw error;
    }
};

export const loginService = async ({ email, password }) => {
    try {

        const response = await db.User.findOne({ where: {email}, raw: true });
        if (!response) return ({ err: 1, msg: `Email không tồn tại!`, token: null });

        const isCorrectPassword = bcrypt.compareSync(password, response.password);
        if (!isCorrectPassword) return ({ err: 1, msg: 'Mật khẩu không đúng!', token: null });

        const token = jwt.sign(
            {
                id: response.id,
                email: response.email,
                isAdmin: response.isAdmin
            },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        )

        return({ err: 0, msg: 'Đăng nhập thành công!', token })
    } catch (error) {
        throw error
    }
}