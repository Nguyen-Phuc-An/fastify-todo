import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiLogin } from "../../api/auth"; 
import { path } from "../../constant/path";
import { parseFastifyError } from "../../utils/parseFastifyError";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ password: "", email: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        console.log("1️⃣ Bắt đầu handleSubmit");
        try {
            const response = await apiLogin(formData);
            console.log("2️⃣ Sau khi gọi apiLogin:", response);
            if (response?.data?.err === 0) {
                alert("Đăng nhập thành công!");
                const isAdmin = response.decodedToken?.isAdmin === 1;
                navigate(isAdmin ? `${path.ADMIN}/${path.USER_MANAGER}` : path.HOME);
            }
        } catch (error) {
            if(error?.response?.data?.err === 1) alert (error?.response?.data?.msg)
            else {
                console.error("❌ Lỗi khi đăng nhập:", error);
                setError(parseFastifyError(error.response?.data?.message) || "Đã xảy ra lỗi khi đăng nhập.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-contentBg w-full h-full">
            <form onSubmit={handleSubmit} className="bg-white shadow-[0_0_30px_10px_rgba(34,197,94,0.4)] rounded-md px-16 py-8 my-12">
                <h2 className="text-3xl font-bold mb-6 text-[#2D3748] text-center">Đăng nhập</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <div className="space-y-2">
                    <div>
                        <label className="block text-[#4A5568] mb-1">Email<span className="text-red-500"> *</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B6CB7]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[#4A5568] mb-1">Mật khẩu<span className="text-red-500"> *</span></label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B6CB7]"
                            required
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <button
                        type="submit"
                        className="w-full py-2 bg-[#4B6CB7] text-white rounded-lg hover:bg-[#2D3748] transition-colors duration-300"
                    >
                        Đăng nhập
                    </button>
                </div>
                <p className="mt-4 text-center text-[#4A5568]">
                    Bạn chưa có tài khoản? <Link to={path.REGISTER} className="text-[#4B6CB7] hover:underline">Đăng ký</Link>
                </p>
            </form>
                
        </div>
    );
};

export default Login;