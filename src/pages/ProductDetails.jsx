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
      // call your cartService addToCart
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

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 md:flex gap-12">

      {/* Product Image */}
      <div className="md:w-1/2">
        <img
          src={product.image || "https://via.placeholder.com/500"}
          alt={product.name}
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 mt-8 md:mt-0">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-500 mb-4">{product.description}</p>
        <p className="text-blue-700 font-bold text-2xl mb-4">₹{product.price}</p>
        {product.inStock ? (
          <p className="text-green-600 mb-4">In Stock</p>
        ) : (
          <p className="text-red-500 mb-4">Out of Stock</p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition ${
            !product.inStock ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
}