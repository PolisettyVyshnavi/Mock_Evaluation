import React, { memo } from "react";

const FleetCard = memo(({ fleet, onUpdateDriver, onToggleStatus, onDelete }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
     
      <h3>{fleet.regNo}</h3>
      <p>Category: {fleet.category}</p>
      <p>Driver: {fleet.driver}</p>
      <p>Status: {fleet.status}</p>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        <button onClick={() => onUpdateDriver(fleet.id)}>Update Driver</button>
        <button onClick={() => onToggleStatus(fleet.id)}>Toggle Status</button>
        <button onClick={() => onDelete(fleet.id)} style={{ color: "red" }}>Delete</button>
      </div>
    </div>
  );
});

export default FleetCard;