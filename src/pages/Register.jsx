import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(name, email, password, role);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-lg"
      >

        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Create Account
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-800 text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-800 text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-800 text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
        />

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-slate-800 text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-700 hover:scale-[1.02] transition shadow-lg"
        >
          Register
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              isError ? "text-red-400" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}

      </form>

    </div>
  );
}

export default Register;