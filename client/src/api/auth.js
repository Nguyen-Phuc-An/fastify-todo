import axiosConfig from "./axios.config";
import { jwtDecode } from 'jwt-decode'

export const apiRegister = async (payload) => {
    try {
        const response = await axiosConfig.post('/api/auth/register', payload);
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiLogin = async (payload) => {
    try {
        const response = await axiosConfig.post('/api/auth/login', payload);
        if (response.data && response.data.token) {
            // Lưu token vào localStorage
            localStorage.setItem('token', response.data.token);

            // Decode token để lấy thông tin
            const decodedToken = jwtDecode(response.data.token);
            const isAdmin = decodedToken.isAdmin || false; // Giả sử token có trường isAdmin
            const isLoggedIn = true; // Đặt isLoggedIn = true khi đăng nhập thành công

            // Lưu thông tin vào localStorage
            localStorage.setItem('isAdmin', isAdmin);
            localStorage.setItem('isLoggedIn', isLoggedIn);
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export const apiLogout = async () => {
    try {
        // Xóa token và đặt isLoggedIn về false
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", false);

        return { success: true };
    } catch (error) {
        throw error;
    }
};