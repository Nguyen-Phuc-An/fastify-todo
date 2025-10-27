import { useEffect, useState } from "react";
import { apiGetAllUsers } from "../../api/user";
import UserDetailModal from "./UserDetailModal";

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
        const res = await apiGetAllUsers();
        if (res?.data?.err === 0) {
            const filtered = res.data.response.rows;
            setUsers(filtered);
        }
        };
        fetchUsers();
    }, []);

    return (
        <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">👥 Quản lý người dùng</h2>

        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-700">
                <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Tên người dùng</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mật khẩu</th>
                <th className="px-4 py-2 text-center">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{u.id}</td>
                    <td className="px-4 py-2">{u.username}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2">{u.password}</td>
                    <td className="px-4 py-2 text-center">
                    <button
                        onClick={() => setSelectedUser(u)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Xem chi tiết
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {selectedUser && (
            <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
        </div>
    );
};

export default UserManager;
