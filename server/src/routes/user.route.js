import * as controller from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { isAdmin } from '../middlewares/userAuthentication.middleware.js';

export default async function authRoutes(fastify) {
    fastify.get('/me', {
        preHandler: verifyToken,
        handler: controller.getMeController
    });

    fastify.get('/', {
        preHandler: [verifyToken, isAdmin],
        handler: controller.getAllUsersController
    });
}
