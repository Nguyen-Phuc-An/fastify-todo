import { useEffect, useState } from "react";
import { apiGetAllTodos, apiAddTodo, apiUpdateTodo, apiDeleteTodo } from "../../api/todo";
import {TodoForm, TodoList, TodoModal} from '../../components/index'
import { useNavigate } from "react-router-dom";
const MyTodos = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState(false);
    const [newTodo, setNewTodo] = useState({ title: "", description: "", dueDate: "" });
    const [editingTodo, setEditingTodo] = useState(null);
    const [selectedTodo, setSelectedTodo] = useState(null);

     const handleAuthError = (err) => {
        const msg = err?.response?.data?.msg || err?.response?.data?.message || err?.message || "";
        if (typeof msg === "string" && msg.toLowerCase().includes("token")) {
            // clear auth state and redirect to login
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            alert("Phiên đăng nhập hết hạn hoặc token không hợp lệ. Vui lòng đăng nhập lại.");
            //navigate('/login');
            return true;
        }
        return false;
    };

    // Lấy danh sách todo
    const fetchTodos = async () => {
        try {
            const res = await apiGetAllTodos();
            if (res.data.err === 0) setTodos(res.data.todos);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách todo:", err);
        }
    };

    useEffect(() => { fetchTodos(); }, []);

    // Thêm mới
    const handleAdd = async () => {
        try {
            const res = await apiAddTodo(newTodo);
            alert(res.data.msg || "Thêm công việc thành công!");
            setNewTodo({ title: "", description: "", dueDate: "" });
            fetchTodos();
        } catch (err) {
            if (handleAuthError(err)) return;
            const message = err.response?.data?.msg;
            alert(message || "Có lỗi xảy ra khi thêm công việc!");
        }
    };

    // Cập nhật
    const handleEdit = async () => {
        try {
            await apiUpdateTodo(editingTodo.id, editingTodo);
            setEditingTodo(null);
            fetchTodos();
        } catch (err) {
            alert(err?.response?.data?.msg || "Lỗi khi cập nhật công việc!");
        }
    };

    // Xóa
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa công việc này?")) {
            await apiDeleteTodo(id);
            fetchTodos();
        }
    };

    // Cập nhật trạng thái
    const handleToggleComplete = async (id, isCompleted) => {
        await apiUpdateTodo(id, { isCompleted: !isCompleted });
        fetchTodos();
    };

    return (
        <div className="flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold mb-6">📝 Công việc của tôi</h1>

            <TodoForm newTodo={newTodo} setNewTodo={setNewTodo} handleAdd={handleAdd} />

            {/* Bộ lọc */}
            <div className="flex gap-3 mb-5">
                <button
                    className={`px-4 py-2 rounded ${!filter ? "bg-green-600" : "bg-gray-600"} hover:underline`}
                    onClick={() => setFilter(false)}
                >
                    Chưa hoàn thành
                </button>
                <button
                    className={`px-4 py-2 rounded ${filter ? "bg-green-600" : "bg-gray-600"} hover:underline`}
                    onClick={() => setFilter(true)}
                >
                    Đã hoàn thành
                </button>
            </div>

            <TodoList
                todos={todos}
                filter={filter}
                setSelectedTodo={setSelectedTodo}
                setEditingTodo={setEditingTodo}
                handleDelete={handleDelete}
                handleToggleComplete={handleToggleComplete}
            />

            {/* Modals */}
            <TodoModal
                selectedTodo={selectedTodo}
                setSelectedTodo={setSelectedTodo}
                editingTodo={editingTodo}
                setEditingTodo={setEditingTodo}
                handleEdit={handleEdit}
            />
        </div>
    );
};

export default MyTodos;
