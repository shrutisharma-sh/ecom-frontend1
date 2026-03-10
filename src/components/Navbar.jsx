import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FaHome, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { getCart } from "../services/cartService";


function Navbar({ isAuthenticated, setIsAuthenticated }) {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
 const { cartCount, setCartCount } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };



  useEffect(() => {

  const fetchCart = async () => {

    try {

      const data = await getCart();

      const totalItems = data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(totalItems);

    } catch (error) {

      console.error("Cart fetch error", error);

    }

  };

  if (isAuthenticated) {
    fetchCart();
  }

}, [isAuthenticated]);

  return (
    <nav className="bg-red-900 text-white px-6 py-3 shadow-md">

      <div className="flex justify-between items-center">

        <h1 className="text-xl font-bold">E-Shop</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          <Link to="/" className="flex items-center gap-2 hover:text-gray-300">
            <FaHome />
            Home
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="flex items-center gap-2 hover:text-gray-300">
                <FaUser />
                Login
              </Link>

              <Link to="/register" className="flex items-center gap-2 hover:text-gray-300">
                <FaUser />
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/cart" className="flex items-center gap-2 hover:text-gray-300 relative">
            <FaShoppingCart />

             {cartCount > 0 && (
             <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 rounded-full">
              {cartCount}
              </span>
               )}

                 Cart
                  </Link>

              <button
                onClick={handleLogout}
                className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="flex flex-col mt-4 gap-4 md:hidden">

          <Link to="/" className="flex items-center gap-2">
            <FaHome />
            Home
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="flex items-center gap-2">
                <FaUser />
                Login
              </Link>

              <Link to="/register" className="flex items-center gap-2">
                <FaUser />
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/cart"
                className="relative flex items-center gap-2"
              >
                <FaShoppingCart />
                Cart

                {cartCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-[2px] rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={handleLogout}
                className="bg-blue-700 px-3 py-1 rounded w-fit"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;