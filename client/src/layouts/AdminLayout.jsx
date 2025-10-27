import { Outlet, Link, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Admin Panel</h2>
                <nav className="flex flex-col p-4 space-y-2">
                    <Link to="/admin/user-manager" className="hover:bg-gray-700 p-2 rounded">👥 Quản lý người dùng</Link>
                </nav>
                <button
                    onClick={handleLogout}
                    className="m-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                >
                    Đăng xuất
                </button>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
