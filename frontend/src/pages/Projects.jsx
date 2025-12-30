import { useState, useEffect } from "react";
import axios from "axios";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        client_id: ""
    });

    const API_URL = "http://127.0.0.1:8000";

    const loadData = async () => {
        setProjects((await axios.get(`${API_URL}/projects/`)).data);
        setClients((await axios.get(`${API_URL}/clients/`)).data);
    };

    const addProject = async (e) => {
        e.preventDefault();
        await axios.post(`${API_URL}/projects/`, form);
        setForm({ name: "", description: "", client_id: "" });
        loadData();
    };

    const deleteProject = async (id) => {
        await axios.delete(`${API_URL}/projects/${id}`);
        loadData();
    };

    useEffect(() => { loadData(); }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Projects</h1>

            {/* Add Form */}
            <form onSubmit={addProject} className="bg-white p-6 shadow rounded mb-6 w-96 space-y-4">
                <input className="w-full p-2 border rounded"
                    placeholder="Project Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input className="w-full p-2 border rounded"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <select className="w-full p-2 border rounded"
                    value={form.client_id}
                    onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                >
                    <option value="">Select Client</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Add Project</button>
            </form>

            {/* Table */}
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Client</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(p => (
                        <tr key={p.id} className="border-b hover:bg-gray-100">
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">{p.description}</td>
                            <td className="p-2">{clients.find(c => c.id == p.client_id)?.name}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => deleteProject(p.id)}
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
