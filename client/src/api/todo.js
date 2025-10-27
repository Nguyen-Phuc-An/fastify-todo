import axiosConfig from "./axios.config";

export const apiGetAllTodos = async () => {
    try {
        const response = await axiosConfig.get('/api/todos')
        return response;
    } catch (error) {
        throw error
    }
}

export const apiGetInfoATodo = async (todoId) => {
    try {
        const response = await axiosConfig.get(`/api/todos/${todoId}`)
        return response;
    } catch (error) {
        throw error
    }
}

export const apiAddTodo = async (payload) => {
    try {
        const response = await axiosConfig.post('/api/todos', payload)
        return response;
    } catch (error) {
        throw error
    }
}

export const apiUpdateTodo = async (todoId, payload) => {
    try {
        const response = await axiosConfig.put(`/api/todos/${todoId}`, payload)
        return response;
    } catch (error) {
        throw error
    }
}

export const apiDeleteTodo = async (todoId) => {
    try {
        const response = await axiosConfig.delete(`/api/todos/${todoId}`)
        return response;
    } catch (error) {
        throw error
    }
}
