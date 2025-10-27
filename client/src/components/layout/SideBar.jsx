import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../../constant/path";
import { apiLogout } from "../../api/auth";

const Sidebar = ({ isOpen, toggle }) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleLogout = async () => {
        await apiLogout();
        navigate("/login");
    };

    const activeClass =
        "bg-[#4B6CB7] text-[#FFFFFF] font-semibold px-2 py-2 rounded transition-all duration-300 shadow-md";
    const normalClass =
        "text-[#F8FAFC] hover:bg-[#718096] px-2 py-2 rounded transition-all duration-300 hover:shadow-md";

    return (
        <div
            className={`bg-[#4A5D70] text-[#F8FAFC] min-h-screen flex flex-col justify-between transition-all duration-500 ease-in-out relative ${
                isOpen ? "w-64" : "w-16"
            }`}
        >
            <div className="flex items-center p-6 relative bg-[#3A4D62] shadow-md">
                <span
                    className={`font-extrabold text-2xl text-[#ECC94B] transition-opacity duration-500 ${
                        isOpen ? "opacity-100" : "opacity-0"
                    }`}
                >
                    TodoApp
                </span>
                <button
                    onClick={toggle}
                    className="absolute top-4 right-4 text-[#F8FAFC] text-2xl w-8 h-8 flex items-center justify-center border border-[#4B6CB7] rounded hover:bg-[#4B6CB7]/20 transition-all duration-300"
                >
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>
            <nav className="flex flex-col gap-2 px-2 mt-4">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                    {isOpen ? "Trang chủ" : "🏠"}
                </NavLink>
                <NavLink
                    to="/tasks"
                    className={({ isActive }) => (isActive ? activeClass : normalClass)}
                >
                    {isOpen ? "Công việc của tôi" : "📝"}
                </NavLink>
            </nav>
            <div className="flex flex-col mb-4 gap-2 px-2 mt-auto">
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="text-[#F8FAFC] hover:bg-[#718096] px-2 py-2 rounded transition-all duration-300 hover:shadow-md"
                    >
                        {isOpen ? "Đăng xuất" : "🚪"}
                    </button>
                ) : (
                    <>
                        <NavLink
                            to={path.LOGIN}
                            className={({ isActive }) => (isActive ? activeClass : normalClass)}
                        >
                            {isOpen ? "Đăng nhập" : "🔑"}
                        </NavLink>
                        <NavLink
                            to={path.REGISTER}
                            className={({ isActive }) => (isActive ? activeClass : normalClass)}
                        >
                            {isOpen ? "Đăng ký" : "📝"}
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;