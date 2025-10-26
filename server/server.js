import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import formbody from '@fastify/formbody';
import indexRoutes from './src/routes/index.routes.js';
import connectDatabase from './src/config/connectDatabase.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const fastify = Fastify({ logger: false });

await fastify.register(formbody);

await fastify.register(cors, {
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// ✅ Tách route view & route API
await fastify.register(indexRoutes, { prefix: '/api' });

const port = process.env.PORT || 5000;

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
