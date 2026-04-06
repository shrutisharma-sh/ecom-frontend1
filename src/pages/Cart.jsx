import { useEffect, useState } from "react";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartItem,
  removeFromCart
} from "../services/cartService";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

const handleCheckout = async () => {
  try {
    await placeOrder();
    alert("Order placed successfully!");
    navigate("/orders");
  } catch (err) {
    console.error("Order failed", err);
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
  try {
    const data = await getCart();
    console.log("CART DATA:", data); 

   
    if (Array.isArray(data)) {
      setCartItems(data);
    } else if (data.items) {
      setCartItems(data.items);
    } else if (data.cartItems) {
      setCartItems(data.cartItems);
    } else {
      setCartItems([]);
    }

  } catch (error) {
    console.error("Cart fetch error", error);
  }
};

  const increaseQty = async (cartItemId, quantity) => {
    await updateCartItem(cartItemId, quantity + 1);
    fetchCart();
  };

  const decreaseQty = async (cartItemId, quantity) => {
    if (quantity <= 1) return;
    await updateCartItem(cartItemId, quantity - 1);
    fetchCart();
  };

  const removeItem = async (cartItemId) => {
    await removeFromCart(cartItemId);
    fetchCart();
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-slate-400 text-center">
            Your cart is empty
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* CART ITEMS */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product?.imageUrl || "https://via.placeholder.com/100"}
                      alt={item.product?.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="font-semibold text-slate-200">
                        {item.product?.title}
                      </h2>

                      <p className="text-slate-400 text-sm">
                        ₹{item.product?.price}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-800 rounded-lg">
                      <button
                        onClick={() => decreaseQty(item.id, item.quantity)}
                        className="px-3 py-1"
                      >
                        -
                      </button>

                      <span className="px-3">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id, item.quantity)}
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl h-fit sticky top-24">
              <h2 className="text-xl font-semibold mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
              </div>

              <div className="border-t border-slate-800 my-4"></div>

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-indigo-400">₹{totalPrice}</span>
              </div>

              <button
  onClick={handleCheckout}
  className="mt-6 w-full bg-indigo-600 py-3 rounded-xl font-semibold"
>
  Checkout
</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}