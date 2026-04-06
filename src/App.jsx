import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      <Navbar 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route 
          path="/login" 
          element={<Login setIsAuthenticated={setIsAuthenticated} />} 
        />

        <Route path="/register" element={<Register />} />

        <Route 
          path="/cart" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </ProtectedRoute>
          } 
        />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route 
  path="/orders" 
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Orders />
    </ProtectedRoute>
  } 
/>
      </Routes>
    </>
  )
}

export default App;