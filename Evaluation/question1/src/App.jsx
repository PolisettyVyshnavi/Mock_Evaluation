import React,{ useDeferredValue, useState } from "react";
import {BrowserRouter,Route, Router,Routes,Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./AdminDashboard";
function App(){
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  return(
    <BrowserRouter>
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path="/admin" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}><AdminDashboard/></ProtectedRoute>}>
        </Route>
       <Route path="*" element={<Navigate to="/login"/>}/>
      </Routes>
    </Router>
    </BrowserRouter>
  )
}
export default App;