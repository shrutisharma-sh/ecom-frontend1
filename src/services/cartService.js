import axiosInstance from "./authService";


export const getCart = async () => {
  const res = await axiosInstance.get("/user/cart");
  return res.data;
};


export const addToCart = async (productId, quantity = 1) => {
  const res = await axiosInstance.post("/user/cart/add", null, {
    params: {
      productId: productId,
      quantity: quantity,
    },
  });

  return res.data;
};


export const updateCartItem = async (cartItemId, quantity) => {
  const res = await axiosInstance.put("/user/cart/update", null, {
    params: {
      cartItemId: cartItemId,
      quantity: quantity,
    },
  });

  return res.data;
};


export const removeFromCart = async (cartItemId) => {
  const res = await axiosInstance.delete(`/user/cart/remove/${cartItemId}`);
  return res.data;
};