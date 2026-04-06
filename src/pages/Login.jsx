import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      setIsAuthenticated(true);
      setIsError(false);
      setMessage("Login Successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      setIsError(true);
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-lg"
      >

        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Welcome Back
        </h2>

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
          className="w-full bg-slate-800 text-slate-200 px-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-700 hover:scale-[1.02] transition shadow-lg"
        >
          Login
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

export default Login;