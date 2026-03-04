import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);


  return (
   <> hello shruti 

  <Navbar 
   isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} />

   <Routes>
     
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} 
        />
      <Route path="/register" element={<Register/>} />
      
       <Route 
        path="/cart" 
        element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
        <h1>Cart Page</h1>
        </ProtectedRoute>
        } 
        />
    </Routes>
   </>
  )
}

export default App
