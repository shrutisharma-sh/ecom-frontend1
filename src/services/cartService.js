import axiosInstance from "./authService";

export const getCart = async () => {
  const res = await axiosInstance.get("/user/cart");
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await axiosInstance.post("/user/cart/add", {
    productId,
    quantity,
  });

  return res.data;
};


export const updateCartItem = async (productId, quantity) => {
  const res = await axiosInstance.put("/user/cart/update", {
    productId,
    quantity
  });

  return res.data;
};

export const removeFromCart = async (productId) => {
  const res = await axiosInstance.delete(`/user/cart/remove/${productId}`);
  return res.data;
};