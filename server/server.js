import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from './src/config/connectDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load biến môi trường
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Khởi tạo Fastify
const fastify = Fastify({
    logger: false, // log request ra console
});

// Cấu hình CORS
await fastify.register(cors, {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Middleware xử lý JSON (Fastify tự có, không cần express.json)
fastify.addHook('preHandler', async (request, reply) => {
  // có thể thêm custom header hoặc logging ở đây
});

// Route test server
fastify.get('/', async (request, reply) => {
    return { message: '✅ Server Fastify đang chạy...' };
});

// Cổng
const port = process.env.PORT || 5000;

// Kết nối CSDL rồi mới start server
const startServer = async () => {
    try {
        await connectDatabase();
        await fastify.listen({ port });
        console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

startServer();
