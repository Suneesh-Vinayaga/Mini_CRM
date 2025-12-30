import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import FollowUps from "./pages/FollowUps";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-900 text-white p-5 space-y-4">
          <h1 className="text-2xl font-bold mb-6">Mini CRM</h1>

          <nav className="space-y-3">
            <Link to="/" className="block hover:text-gray-300">Dashboard</Link>
            <Link to="/clients" className="block hover:text-gray-300">Clients</Link>
            <Link to="/projects" className="block hover:text-gray-300">Projects</Link>
            <Link to="/tasks" className="block hover:text-gray-300">Tasks</Link>
            <Link to="/followups" className="block hover:text-gray-300">Follow Ups</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/followups" element={<FollowUps />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
