import * as controller from '../controllers/todo.controller.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';

export default async function authRoutes(fastify) {
    fastify.post('/', {
        preHandler: verifyToken,
        handler: controller.createTodoController
    });

    // Route lấy tất cả Todo của user
    fastify.get('/', {
        preHandler: verifyToken,
        handler: controller.getTodosController
    });

    // Route lấy thông tin một Todo
    fastify.get("/:id", {
        preHandler: verifyToken,
        handler: controller.getTodoByIdController,
    })

    fastify.put('/:id', {
        preHandler: verifyToken,
        handler: controller.updateTodoController
    });

    fastify.delete('/:id', {
        preHandler: verifyToken,
        handler: controller.deleteTodoController
    });
    
}

