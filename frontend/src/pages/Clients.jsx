import { useState, useEffect } from "react";
import axios from "axios";

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: ""
    });

    const API_URL = "http://127.0.0.1:8000";

    const fetchClients = async () => {
        const res = await axios.get(`${API_URL}/clients/`);
        setClients(res.data);
    };

    const addClient = async (e) => {
        e.preventDefault();
        await axios.post(`${API_URL}/clients/`, form);
        setForm({ name: "", email: "", phone: "", company: "" });
        fetchClients();
    };

    const deleteClient = async (id) => {
        if (confirm("Are you sure you want to delete this client?")) {
            await axios.delete(`${API_URL}/clients/${id}`);
            fetchClients();
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Clients</h1>

            {/* Add Client Form */}
            <form onSubmit={addClient} className="bg-white p-6 shadow rounded mb-6 space-y-4 w-96">
                <input className="w-full p-2 border rounded"
                    placeholder="Client Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input className="w-full p-2 border rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input className="w-full p-2 border rounded"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <input className="w-full p-2 border rounded"
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                />

                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                    Add Client
                </button>
            </form>

            {/* Client Table */}
            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Phone</th>
                        <th className="p-2">Company</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((c, i) => (
                        <tr key={i} className="border-b hover:bg-gray-100">
                            <td className="p-2">{c.name}</td>
                            <td className="p-2">{c.email}</td>
                            <td className="p-2">{c.phone}</td>
                            <td className="p-2">{c.company}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => deleteClient(c.id)}
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
