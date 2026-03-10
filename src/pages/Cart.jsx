import { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeFromCart
} from "../services/cartService";

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Cart fetch error", error);
    }
  };

  const increaseQty = async (productId, quantity) => {
    await updateCartItem(productId, quantity + 1);
    fetchCart();
  };

  const decreaseQty = async (productId, quantity) => {
    if (quantity <= 1) return;

    await updateCartItem(productId, quantity - 1);
    fetchCart();
  };

  const removeItem = async (productId) => {
    await removeFromCart(productId);
    fetchCart();
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">
          Your cart is empty
        </p>
      ) : (

        <div className="space-y-6">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.product.image || "https://via.placeholder.com/100"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <h2 className="font-semibold">
                    {item.product.name}
                  </h2>

                  <p className="text-gray-500">
                    ₹{item.product.price}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    decreaseQty(item.product.id, item.quantity)
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQty(item.product.id, item.quantity)
                  }
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          {/* TOTAL */}

          <div className="flex justify-end mt-8">

            <div className="bg-gray-100 p-6 rounded-lg shadow w-[300px]">

              <h2 className="text-xl font-semibold mb-4">
                Order Summary
              </h2>

              <p className="flex justify-between mb-2">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </p>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Checkout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}