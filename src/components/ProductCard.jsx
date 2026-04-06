import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../services/cartService";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { setCartCount } = useContext(CartContext);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); 
    try {
      await addToCart(product.id, 1);
      setCartCount((prev) => prev + 1);
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-4">
          <span className="text-white text-sm font-semibold bg-slate-800/80 px-3 py-1 rounded-lg backdrop-blur">
            ₹{product.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 shadow-lg transform hover:scale-110 transition"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-200 group-hover:text-indigo-400 transition">
          {product.title}
        </h2>

        <p className="text-slate-400 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-indigo-400 font-bold text-lg">
            ₹{product.price}
          </span>

          {product.inStock ? (
            <span className="text-green-400 text-xs font-medium bg-green-400/10 px-2 py-1 rounded-md">
              In Stock
            </span>
          ) : (
            <span className="text-red-400 text-xs font-medium bg-red-400/10 px-2 py-1 rounded-md">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;