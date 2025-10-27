import * as service from '../services/todo.service.js';
import { validateDueDate } from '../validations/validateDueDate.js';

export const createTodoController = async (request, reply) => {
    try {
        const userId = request.user.id;
        const todoData = request.body;
        if (!todoData.title || todoData.title.trim() === '') {
            return reply.status(400).send({
                err: 1,
                msg: 'Title không được để trống'
            });
        }

        const { valid: dueDateValid, msg: dueDateMsg } = validateDueDate(todoData.dueDate);
        if (!dueDateValid) {
            return reply.status(400).send({
                err: 1,
                msg: `Validation error: ${dueDateMsg}`,
            });
        }

        const result = await service.createTodoService(todoData, userId);
        return reply.status(201).send(result);
    } catch (error) {
        return reply.status(500).send({
            err: -1,
            msg: 'Failed at createTodoController: ' + error.message
        });
    }
};

export const getTodosController = async (request, reply) => {
    try {
        const userId = request.user.id;
        const result = await service.getTodosByUserService(userId);
        return reply.send(result);
    } catch (error) {
        return reply.status(500).send({
            err: -1,
            msg: 'Failed at getTodosController: ' + error.message
        });
    }
};

export const getTodoByIdController = async (request, reply) => {
    try {
        const userId = request.user.id;
        const todoId = request.params.id;
        const result = await service.getTodoByIdService(todoId, userId);
        if (result.err === 0) {
            return reply.send(result);
        }
        return reply.status(404).send(result);
    } catch (error) {
        return reply.status(500).send({
            err: -1,
            msg: 'Failed at getTodoByIdController: ' + error.message
        });
    }
};

export const updateTodoController = async (request, reply) => {
    try {
        const userId = request.user.id;
        const todoId = request.params.id;
        const updates = request.body;
        const { valid: dueDateValid, msg: dueDateMsg } = validateDueDate(updates.dueDate);
        if (!dueDateValid) {
            return reply.status(400).send({
                err: 1,
                msg: `Validation error: ${dueDateMsg}`,
            });
        }
        const result = await service.updateTodoService(todoId, userId, updates);
        if (result.err === 0) {
            return reply.send(result);
        }
        return reply.status(404).send(result);
    } catch (error) {
        return reply.status(500).send({
            err: -1,
            msg: 'Failed at updateTodoController: ' + error.message
        });
    }
};

export const deleteTodoController = async (request, reply) => {
    try {
        const userId = request.user.id;
        const todoId = request.params.id;
        const result = await service.deleteTodoService(todoId, userId);
        if (result.err === 0) {
            return reply.send(result);
        }
        return reply.status(404).send(result);
    } catch (error) {
        return reply.status(500).send({
            err: -1,
            msg: 'Failed at deleteTodoController: ' + error.message
        });
    }
};