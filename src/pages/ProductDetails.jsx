import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const { cartCount, setCartCount } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await fetch(`http://localhost:8080/api/user/cart/add/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCartCount(cartCount + 1);
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Failed to add product to cart");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  if (!product) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-24 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Image Section */}
        <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-xl transform group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* Info Section */}
        <div>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-slate-400 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-indigo-400">
              ₹{product.price}
            </span>
          </div>

          {/* Stock */}
          {product.inStock ? (
            <span className="inline-block text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-md mb-6">
              In Stock
            </span>
          ) : (
            <span className="inline-block text-red-400 text-sm bg-red-400/10 px-3 py-1 rounded-md mb-6">
              Out of Stock
            </span>
          )}

          {/* Actions */}
          <div className="flex gap-4">

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition shadow-lg
              ${
                product.inStock
                  ? "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
                  : "bg-slate-700 cursor-not-allowed opacity-50"
              }`}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            {/* Optional secondary button */}
            <button className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 transition">
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}