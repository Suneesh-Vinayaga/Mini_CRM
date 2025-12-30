import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default function Dashboard() {
    const [stats, setStats] = useState({ clients: 0, projects: 0, tasks: 0, followups: 0 });

    useEffect(() => {
        axios.get(`${API_URL}/dashboard/`).then(res => setStats(res.data));
    }, []);

    return (
        <div className="p-5">

            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-4 gap-6 mb-10">
                <Card label="Clients" count={stats.clients} color="bg-blue-500" />
                <Card label="Projects" count={stats.projects} color="bg-green-500" />
                <Card label="Tasks (Pending)" count={stats.tasks} color="bg-yellow-500" />
                <Card label="Follow Ups" count={stats.followups} color="bg-purple-500" />
            </div>
        </div>
    )
}

function Card({ label, count, color }) {
    return (
        <div className={`${color} text-white p-6 rounded-lg shadow text-center`}>
            <h2 className="text-4xl font-bold">{count}</h2>
            <p className="text-lg mt-2">{label}</p>
        </div>
    );
}
