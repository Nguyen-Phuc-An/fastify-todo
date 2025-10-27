import { FaCheck, FaTrash, FaEdit, FaEye } from "react-icons/fa";

const TodoList = ({
    todos,
    filter,
    setSelectedTodo,
    setEditingTodo,
    handleDelete,
    handleToggleComplete,
}) => (
    <div className="w-full max-w-3xl bg-[white] p-5 rounded-2xl shadow-lg text-black">
        <table className="w-full border-collapse">
            <thead>
                <tr className="text-left border-b border-gray-500">
                <th className="p-2">STT</th>
                <th className="p-2">Tiêu đề</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2 text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {todos.filter((t) => t.isCompleted === filter).length === 0 ? (
                <tr>
                    <td colSpan="4" className="text-center text-gray-400 py-4">
                        Không có công việc nào.
                    </td>
                </tr>
                ) : (
                todos
                    .filter((t) => t.isCompleted === filter)
                    .map((todo, idx) => (
                    <tr key={todo.id} className="border-b border-gray-600 hover:bg-[#3A456A] transition">
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">{todo.title}</td>
                        <td className="p-2">{todo.isCompleted ? "✅ Hoàn thành" : "⏳ Đang làm"}</td>
                        <td className="p-2 flex justify-center gap-3">
                            <button
                                onClick={() => setSelectedTodo(todo)}
                                className="text-blue-400 hover:text-blue-500"
                                title="Xem chi tiết"
                            >
                                <FaEye />
                            </button>

                            {!todo.isCompleted && (
                                <>
                                    <button
                                        onClick={() => setEditingTodo(todo)}
                                        className="text-yellow-400 hover:text-yellow-500"
                                        title="Sửa"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleToggleComplete(todo.id, todo.isCompleted)}
                                        className="text-green-400 hover:text-green-500"
                                        title="Cập nhật trạng thái"
                                    >
                                        <FaCheck />
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => handleDelete(todo.id)}
                                className="text-red-400 hover:text-red-500"
                                title="Xóa"
                            >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default TodoList;
