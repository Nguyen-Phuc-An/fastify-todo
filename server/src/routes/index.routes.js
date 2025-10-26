import authRouter from './auth.route.js';
import userRouter from './user.route.js'

export default async function indexRoutes(fastify) {
    fastify.register(authRouter, { prefix: '/auth' });
    fastify.register(userRouter, { prefix: '/users' });

    fastify.get('/', {
        handler: (req, reply) => {
            reply.send("server on...");
        }
    });
}
