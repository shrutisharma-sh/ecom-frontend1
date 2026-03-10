import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

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
     
       <Route path="/" element={<Home />} />
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
   </>
  )
}

export default App
