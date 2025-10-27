import axiosConfig from "./axios.config";

export const apiGetCurrentUser = async () => {
    try {
        const response = await axiosConfig.get('/api/users/me')
        return response;
    } catch (error) {
        throw error
    }
}

export const apiGetAllUsers = async () => {
    try {
        const response = await axiosConfig.get('/api/users')
        return response;
    } catch (error) {
        throw error
    }
}