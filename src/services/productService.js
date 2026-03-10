import axiosInstance from "./authService";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/public/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`/public/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
};