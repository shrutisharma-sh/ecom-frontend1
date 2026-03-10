import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../services/cartService";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

 const { cartCount, setCartCount } = useContext(CartContext);

  const handleAddToCart = async () => {

  try {

    await addToCart(product.id, 1);

    setCartCount(cartCount + 1);

  } catch (error) {

    console.error("Add to cart failed", error);

  }

};

  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <div className="relative">

        <Link to={`/product/${product.id}`}>
  <img
    src={product.image || "https://via.placeholder.com/300"}
    alt={product.name}
    className="w-full h-56 object-cover"
  />
</Link>

        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-end justify-end p-4 transition">

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow-lg"
          >
            <FaShoppingCart />
          </button>

        </div>

      </div>

      <div className="p-4">

        <Link to={`/product/${product.id}`}>
  <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
    {product.name}
  </h2>
</Link>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-3">

          <span className="text-blue-700 font-bold text-lg">
            ₹{product.price}
          </span>

          {product.inStock ? (
            <span className="text-green-600 text-sm font-medium">
              In Stock
            </span>
          ) : (
            <span className="text-red-500 text-sm font-medium">
              Out of Stock
            </span>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProductCard;