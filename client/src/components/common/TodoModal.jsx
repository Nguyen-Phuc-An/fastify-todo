const TodoModal = ({ selectedTodo, setSelectedTodo, editingTodo, setEditingTodo, handleEdit }) => {
    // Modal xem chi tiết
    if (selectedTodo) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <div className="bg-white text-black p-6 rounded-xl w-[90%] md:w-[400px] shadow-lg">
                    <h2 className="text-2xl font-bold mb-2">{selectedTodo.title}</h2>
                    <p className="text-gray-700 mb-2">{selectedTodo.description || "Không có mô tả"}</p>
                    <p>📅 Hạn chót: {selectedTodo.dueDate ? new Date(selectedTodo.dueDate).toLocaleDateString() : "Không có"}</p>
                    <p>🕒 Ngày tạo: {new Date(selectedTodo.createdAt).toLocaleString()}</p>
                    <button
                        onClick={() => setSelectedTodo(null)}
                        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        );
    }
    // Modal sửa
    if (editingTodo) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <div className="bg-white text-black p-6 rounded-xl w-[90%] md:w-[400px] shadow-lg">
                    <h2 className="text-2xl font-bold mb-3">Chỉnh sửa công việc</h2>
                    <input
                        type="text"
                        value={editingTodo.title}
                        onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                        className="p-2 border w-full mb-3 rounded"
                        placeholder="Tiêu đề"
                    />
                    <textarea
                        value={editingTodo.description}
                        onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                        className="p-2 border w-full mb-3 rounded"
                        placeholder="Mô tả"
                    ></textarea>
                    <input
                        type="date"
                        value={editingTodo.dueDate ? editingTodo.dueDate.split("T")[0] : ""}
                        onChange={(e) => setEditingTodo({ ...editingTodo, dueDate: e.target.value })}
                        className="p-2 border w-full mb-3 rounded"
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setEditingTodo(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleEdit}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default TodoModal;
