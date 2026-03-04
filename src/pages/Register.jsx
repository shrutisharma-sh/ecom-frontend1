import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); 

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await registerUser(name, email, password, role);
      console.log("REGISTER RESPONSE:", data);
      alert("Registration Successful");
    } catch (error) {
      console.error("Register error:", error);
      alert("Registration Failed");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

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

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>

      <br /><br />

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;