import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FaHome, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { getCart } from "../services/cartService";

function Navbar({ isAuthenticated, setIsAuthenticated }) {

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setCartCount } = useContext(CartContext);

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

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

    if (isAuthenticated && !isAuthPage) {
      fetchCart();
    }
  }, [isAuthenticated, isAuthPage]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-slate-900/70 border-b border-slate-800 text-slate-200 px-6 py-3">

      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide text-indigo-400 cursor-pointer"
        >
          E-Shop
        </h1>

        {/* Search Bar (Hidden on Auth Pages) */}
        {!isAuthPage && (
          <div className="hidden md:flex flex-1 mx-10">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-slate-800 text-sm px-4 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          {isAuthPage ? (
            <>
              <Link to="/" className="hover:text-indigo-400 transition">
                Home
              </Link>

              {location.pathname === "/login" ? (
                <Link
                  to="/register"
                  className="px-4 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Register
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/" className="flex items-center gap-2 hover:text-indigo-400 transition">
                <FaHome />
                Home
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="hover:text-indigo-400 transition">
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {/* Cart */}
                  <Link
                    to="/cart"
                    className="relative flex items-center gap-2 hover:text-indigo-400 transition"
                  >
                    <FaShoppingCart />

                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-indigo-500 text-white text-xs px-2 rounded-full">
                        {cartCount}
                      </span>
                    )}

                    Cart
                  </Link>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold cursor-pointer hover:scale-105 transition">
                    U
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
                  >
                    Logout
                  </button>
                </>
              )}
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
        <div className="flex flex-col mt-4 gap-4 md:hidden bg-slate-900/90 backdrop-blur-lg p-4 rounded-xl border border-slate-800">

          {/* Search hidden on auth */}
          {!isAuthPage && (
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none"
            />
          )}

          {isAuthPage ? (
            <>
              <Link to="/">Home</Link>

              {location.pathname === "/login" ? (
                <Link to="/register">Register</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/" className="flex items-center gap-2">
                <FaHome />
                Home
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              ) : (
                <>
                  <Link to="/cart" className="flex items-center gap-2">
                    <FaShoppingCart />
                    Cart

                    {cartCount > 0 && (
                      <span className="bg-indigo-500 text-white text-xs px-2 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-slate-800 px-3 py-1 rounded w-fit"
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;