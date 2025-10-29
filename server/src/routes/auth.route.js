import * as controller from '../controllers/auth.controller.js';
import { loginBodySchema, registerBodySchema } from '../schemas/auth.schema.js';

export default async function authRoutes(fastify) {
    fastify.post('/register', {
        schema: { body: registerBodySchema },
        handler: controller.registerController
    });

    fastify.post('/login', {
        schema: { body: loginBodySchema },
        handler: controller.loginController
    });
}
