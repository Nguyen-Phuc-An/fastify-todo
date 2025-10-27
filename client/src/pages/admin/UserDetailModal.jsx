const UserDetailModal = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
                <h3 className="text-xl font-semibold mb-3">Thông tin chi tiết</h3>

                <div className="space-y-2 text-sm">
                    <p><strong>ID:</strong> {user.id}</p>
                    <p><strong>Tên người dùng:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Admin:</strong> {user.isAdmin ? "Có" : "Không"}</p>
                    <p><strong>Ngày tạo:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                    <p><strong>Cập nhật gần nhất:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
                    <p><strong>Trạng thái xóa:</strong> {user.deletedAt ? user.deletedAt : "Chưa xóa"}</p>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default UserDetailModal;
