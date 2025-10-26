import * as controller from '../controllers/auth.controller.js';

export default async function authRoutes(fastify) {
    fastify.post('/register', {
        handler: controller.registerController
    });

    fastify.post('/login', {
        handler: controller.loginController
    });
}
