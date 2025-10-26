import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = async (req, reply) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.code(401).send({ err: 1, msg: 'Access token is missing or invalid format' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            // lưu thông tin user vào request để controller dùng
            req.user = decoded;
        } catch (err) {
            const msg = err.name === 'TokenExpiredError' ? 'Access token has expired' : 'Invalid access token';
            return reply.code(401).send({ err: 1, msg });
        }

    } catch (error) {
        return reply.code(500).send({ err: -1, msg: 'Internal server error' });
    }
};
