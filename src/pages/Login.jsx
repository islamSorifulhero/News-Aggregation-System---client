import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import app from "../firebase/firebase.config.js";
import { toast } from "react-toastify";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error("❌ " + err.message);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@user.com");
    setPassword("User123");
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-600"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleDemoLogin}
          className="w-full mt-2 bg-gray-600 text-white py-2 rounded hover:bg-gray-500"
        >
          Demo User Login
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-2 bg-red-600 text-white py-2 rounded hover:bg-red-500"
        >
          Login with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-700 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
