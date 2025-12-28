import { useCallback } from "react";

const updateDriver=useCallback((id)=>{
    const newName=prompt("Enter new driver name:");
    if(newName && newName.trim()!==""){
    setFleets(perv=>perv.map(f=>f.id===id?{...f,driver:newName}:f))
}
},[]);
const toggleAvailablity=useCallback((id)=>{
    setFleets(prev=>prev.map(f=>f.id===id?{...f,status:f.status==="Available"?"Unavailable":"Available"}:f));
},[]);
const deleteVehicle=useCallback((id)=>{
    if(window.confirm("Conform deletion?")){
    setFleets(prev=>prev.filter(f=>f.id!==id));
}
},[])
export default AdminDashboard;