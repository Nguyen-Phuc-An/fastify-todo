import db from '../models/index.js';

export const createTodoService = async (todoData, userId) => {
    try {
        const {title, description, dueDate, isCompleted} = todoData

        const todo = await db.Todo.create({
            userId,
            title,
            description,
            dueDate: dueDate ? dueDate : null,
            isCompleted: isCompleted ? isCompleted : false
        });
        return {
            err: 0,
            msg: 'Todo created successfully',
            todo
        };
    } catch (error) {
        throw error;
    }
};

export const getTodosByUserService = async (userId) => {
    try {
        const todos = await db.Todo.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        return {
            err: 0,
            msg: 'Get todos successfully',
            todos
        };
    } catch (error) {
        throw error;
    }
};

export const getTodoByIdService = async (todoId, userId) => {
    try {
        const todo = await db.Todo.findOne({
            where: { id: todoId, userId }
        });

        return {
            err: todo ? 0 : 1,
            msg: todo ? 'Get todo successfully' : 'Todo not found',
            todo
        };
    } catch (error) {
        throw error;
    }
};

export const updateTodoService = async (todoId, userId, updateData) => {
    try {
        const todo = await db.Todo.findOne({ where: { id: todoId, userId } });
        if (!todo) {
            return { err: 1, msg: 'Todo not found' };
        }

        const allowedFields = ['title', 'description', 'dueDate', 'isCompleted']

        // Lọc dữ liệu cập nhật để chỉ giữ các trường hợp lệ
        const filteredData = {};
        for (const key of allowedFields) {
            if (updateData[key] !== undefined && updateData[key] !== null && updateData[key] !== ''){
                filteredData[key] = updateData[key];
            }
        }


        const response = await todo.update(filteredData);

        return {
            err: 0,
            msg: 'Todo updated successfully',
            response
        };
    } catch (error) {
        throw error;
    }
};

export const deleteTodoService = async (todoId, userId) => {
    try {
        const deleted = await db.Todo.destroy({ where: { id: todoId, userId } });
        if (!deleted) {
            return { err: 1, msg: 'Todo not found or not deleted' };
        }

        return {
            err: 0,
            msg: 'Todo deleted successfully'
        };
    } catch (error) {
        throw error;
    }
};