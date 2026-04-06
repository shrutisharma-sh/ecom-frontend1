import { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-slate-900 p-5 rounded-xl mb-5 border border-slate-800"
          >
            <div className="flex justify-between mb-3">
              <span>Order #{order.id}</span>
              <span className="text-indigo-400">{order.status}</span>
            </div>

            <p className="text-sm text-slate-400 mb-2">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.product.title}</span>
                <span>
                  {item.quantity} × ₹{item.price}
                </span>
              </div>
            ))}

            <div className="mt-3 font-semibold">
              Total: ₹{order.totalAmount}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;