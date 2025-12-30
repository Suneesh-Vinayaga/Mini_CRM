import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");

    const fetchTasks = async () => {
        const res = await axios.get(`${API_URL}/tasks/`);
        setTasks(res.data);
    };

    const addTask = async () => {
        if (!title) return alert("Task name required");

        await axios.post(`${API_URL}/tasks/`, {
            title,
            due_date: dueDate ? new Date(dueDate).toISOString() : null,
            status: "pending"
        });

        setTitle("");
        setDueDate("");
        fetchTasks();
    };

    const deleteTask = async (id) => {
        if (confirm("Delete this task?")) {
            await axios.delete(`${API_URL}/tasks/${id}`);
            fetchTasks();
        }
    };

    const toggleStatus = async (task) => {
        await axios.put(`${API_URL}/tasks/${task.id}`, {
            ...task,
            status: task.status === "pending" ? "completed" : "pending"
        });
        fetchTasks();
    };

    useEffect(() => { fetchTasks(); }, []);

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-6">Tasks</h1>

            {/* Form */}
            <div className="bg-white shadow p-5 rounded w-96 mb-6">
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Task title"
                    className="border p-2 w-full mb-3 rounded"
                />

                <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                />

                <button
                    onClick={addTask}
                    className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
                >
                    Add Task
                </button>
            </div>

            {/* Table */}
            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="border-b font-bold">
                        <td className="p-2">Title</td>
                        <td className="p-2">Due Date</td>
                        <td className="p-2">Status</td>
                        <td className="p-2">Action</td>
                    </tr>
                </thead>

                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} className="border-b">
                            <td className="p-2">{task.title}</td>
                            <td className="p-2">{task.due_date?.slice(0, 10) || "-"}</td>

                            <td className="p-2">
                                <button
                                    onClick={() => toggleStatus(task)}
                                    className={`px-3 py-1 rounded text-white 
                                        ${task.status === "completed" ? "bg-green-600" : "bg-yellow-600"}`}
                                >
                                    {task.status}
                                </button>
                            </td>

                            <td className="p-2">
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
