import React,{ useState } from "react";
import { Routes,Route,Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./AdminDashboard";
function App(){
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  return(
   
      <Routes>
        <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}/>
        <Route path="/admin" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><AdminDashboard/></ProtectedRoute>}/>
       <Route path="*" element={<Navigate to="/login" replace/>}/>
      </Routes>
   
  
  )
}
export default App;