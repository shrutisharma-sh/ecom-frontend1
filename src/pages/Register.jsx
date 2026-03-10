import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(name, email, password);

      setIsError(false);
      setMessage("Registration Successful");

      setTimeout(() => {
        navigate("/");  
      }, 1200);

    } catch (error) {
      console.error("Register error:", error);
      setIsError(true);
      setMessage("Registration Failed");
    }
  };

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d3b66",
  };

  const formStyle = {
    backgroundColor: "#fffff0",
    padding: "40px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "20px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#1e5fa3",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  };

  const messageStyle = {
    marginTop: "15px",
    fontSize: "14px",
    color: isError ? "red" : "green"
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleRegister}>
        <h2 style={{ color: "#0d3b66" }}>Register</h2>

        <input
          style={inputStyle}
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={inputStyle}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={inputStyle}
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={buttonStyle} type="submit">Register</button>

        {message && (
          <p style={messageStyle}>{message}</p>
        )}

      </form>
    </div>
  );
}

export default Register;