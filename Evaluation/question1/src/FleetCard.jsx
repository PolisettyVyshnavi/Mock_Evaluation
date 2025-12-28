import React,{memo} from "react";
const FleetCard=memo(({fleet,onUpate,onToggle,onDelete})=>{
    return(
        <div className="card">
            <img src="https://viaa.placeholder.com/150" alt="vehicle" />
            <p>{fleet.regNo}</p>
            <p>{fleet.category}</p>
            <p>{fleet.driver}</p>
            <p>{fleet.status}</p>
            <button onClick={()=>onUpate(fleet.id)}>UpdateDriver</button>
            <button onClick={()=>onToggle(fleet.id)}>Toogle Status</button>
             <button onClick={()=>onDelete(fleet.id)}>Delete</button>
        </div>
    )
})
export default FleetCard;