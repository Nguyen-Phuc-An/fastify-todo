const TodoForm = ({ newTodo, setNewTodo, handleAdd }) => (
    <div className="w-full max-w-3xl bg-[#636318] p-5 rounded-2xl shadow-lg mb-6">
        <h2 className="text-lg font-semibold mb-3">Thêm công việc mới</h2>
        <div className="flex flex-col md:flex-row gap-3">
            <input
                type="text"
                placeholder="Tiêu đề"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                className="p-2 rounded text-black flex-1"
                required
            />
            <input
                type="text"
                placeholder="Mô tả"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                className="p-2 rounded text-black flex-1"
            />
            <input
                type="date"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                className="p-2 rounded text-black"
            />
            <button onClick={handleAdd} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                Thêm
            </button>
        </div>
    </div>
);

export default TodoForm;
