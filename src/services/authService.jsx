import axios from "axios";

const API = "http://localhost:8080/api/auth";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export const loginUser = async (email, password) => {
  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (name, email, password, role) => {
  const response = await axios.post(`${API}/register`, {
    name,
    email,
    password,
    role,
  });

  return response.data;
};


export default axiosInstance;