import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default function FollowUps() {
    const [followups, setFollowups] = useState([]);
    const [clients, setClients] = useState([]);
    const [note, setNote] = useState("");
    const [clientId, setClientId] = useState("");
    const [date, setDate] = useState("");

    const loadData = async () => {
        const f = await axios.get(`${API_URL}/followups/`);
        setFollowups(f.data);
        const c = await axios.get(`${API_URL}/clients/`);
        setClients(c.data);
    };

    const addFollowUp = async () => {
        if (!note || !clientId) return alert("Required fields missing");
        await axios.post(`${API_URL}/followups/`, {
            note,
            client_id: Number(clientId),
            date: date ? new Date(date).toISOString() : null
        });
        setNote(""); setClientId(""); setDate("");
        loadData();
    };

    const remove = async (id) => {
        if (confirm("Delete follow up?")) {
            await axios.delete(`${API_URL}/followups/${id}`);
            loadData();
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-6">Follow Ups</h1>

            <div className="bg-white shadow p-5 rounded w-96 mb-6">
                <textarea
                    className="border p-2 w-full mb-3 rounded"
                    placeholder="Note"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                />

                <select
                    value={clientId}
                    onChange={e => setClientId(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                >
                    <option value="">Select Client</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <input
                    type="date" value={date}
                    onChange={e => setDate(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                />

                <button className="bg-blue-600 text-white w-full p-2 rounded"
                    onClick={addFollowUp}>
                    Add Follow Up
                </button>
            </div>

            <table className="w-full bg-white shadow rounded">
                <thead>
                    <tr className="border-b font-bold">
                        <td className="p-2">Note</td>
                        <td className="p-2">Client</td>
                        <td className="p-2">Date</td>
                        <td className="p-2">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {followups.map(f => (
                        <tr key={f.id} className="border-b">
                            <td className="p-2">{f.note}</td>
                            <td className="p-2">{clients.find(c => c.id === f.client_id)?.name}</td>
                            <td className="p-2">{f.date?.slice(0, 10) || "-"}</td>
                            <td className="p-2">
                                <button onClick={() => remove(f.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded">
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
