import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { path } from "../constant/path";
import { apiGetCurrentUser } from "../api/user";

const Homepage = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const [username, setUsername] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            if (isLoggedIn) {
                try {
                    const response = await apiGetCurrentUser();
                    if (response?.data?.err === 0) {
                        setUsername(response.data.user.username);
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy thông tin user: ", error?.response?.data?.msg);
                }
            }
        };
        fetchUser();
    }, [isLoggedIn]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="relative w-full max-w-3xl bg-[#F9FAFB] p-12 rounded-3xl shadow-lg border-2 border-[#4B6CB7] text-center max-h-[80vh] overflow-auto transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#2D3748] leading-relaxed md:leading-tight">
                    Chào mừng {isLoggedIn && username ? <span className="text-red-500">{username}</span> : ''} đến với Todo App!
                </h1>
                <p className="text-lg md:text-xl mb-6 text-[#4A5568]">
                    Quản lý công việc của bạn một cách dễ dàng, hiệu quả và vui vẻ.
                </p>
                {!isLoggedIn && (
                    <div className="flex justify-center gap-4">
                        <Link
                            to={path.LOGIN}
                            className="px-6 py-3 bg-[#B22222] text-white rounded-xl font-semibold shadow-md hover:bg-[#2D3748] transition-all duration-300 hover:shadow-lg"
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            to={path.REGISTER}
                            className="px-6 py-3 bg-[#4B6CB7] text-white rounded-xl font-semibold shadow-md hover:bg-[#2D3748] transition-all duration-300 hover:shadow-lg"
                        >
                            Tạo tài khoản
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;