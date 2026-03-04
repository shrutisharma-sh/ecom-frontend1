import { useState } from "react";
import { loginUser } from "../services/authService";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(email, password);
    localStorage.setItem("token", data.token);

    setIsAuthenticated(true); 
    alert("Login Successful");

  } catch (error) {
    console.error("Login error:", error);
    alert("Login Failed");
  }
};

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;