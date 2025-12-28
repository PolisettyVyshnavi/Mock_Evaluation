import { useState, useCallback } from "react";
import FleetCard from "../components/FleetCard";

const AdminDashboard = () => {
  const [fleets, setFleets] = useState([]);
  const [form, setForm] = useState({ regNo: "", category: "Car", driver: "", status: "Available" });

  const handleAddFleet = (e) => {
    e.preventDefault();
    if (!form.regNo || !form.driver) return;
    setFleets(prev => [...prev, { ...form, id: Date.now() }]);
    setForm({ regNo: "", category: "Car", driver: "", status: "Available" });
  };

  const updateDriver = useCallback((id) => {
    const newName = prompt("Enter new driver name:");
    if (newName && newName.trim() !== "") {
      setFleets(prev => prev.map(f => f.id === id ? { ...f, driver: newName } : f));
    }
  }, []);

  const toggleStatus = useCallback((id) => {
    setFleets(prev => prev.map(f => f.id === id ? { ...f, status: f.status === "Available" ? "Unavailable" : "Available" } : f));
  }, []);

  const deleteFleet = useCallback((id) => {
    if (window.confirm("Confirm deletion?")) {
      setFleets(prev => prev.filter(f => f.id !== id));
    }
  }, []);

  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee" }}>Navbar</nav>
      <div style={{ display: "flex" }}>
        <aside style={{ width: "250px", padding: "10px" }}>
          <h3>Add Fleet</h3>
          <form onSubmit={handleAddFleet}>
            <input placeholder="Reg No" value={form.regNo} onChange={e => setForm({ ...form, regNo: e.target.value })} required />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option>Auto</option>
              <option>Car</option>
              <option>Truck</option>
              <option>Bus</option>
            </select>
            <input placeholder="Driver" value={form.driver} onChange={e => setForm({ ...form, driver: e.target.value })} required />
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Available</option>
              <option>Unavailable</option>
            </select>
            <button type="submit">Add Fleet</button>
          </form>
        </aside>
        <main style={{ flex: 1, padding: "10px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
          {fleets.map(f => (
            <FleetCard
              key={f.id}
              fleet={f}
              onUpdateDriver={updateDriver}
              onToggleStatus={toggleStatus}
              onDelete={deleteFleet}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;