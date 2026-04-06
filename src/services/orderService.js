import axiosInstance from "./authService";


export const placeOrder = async () => {
  const res = await axiosInstance.post("/user/orders/place");
  return res.data;
};


export const getUserOrders = async () => {
  const res = await axiosInstance.get("/user/orders");
  return res.data;
};