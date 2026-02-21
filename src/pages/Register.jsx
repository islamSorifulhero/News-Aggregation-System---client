import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = pwd => {
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasLength = pwd.length >= 6;
    return hasUppercase && hasLowercase && hasLength;
  };

  const handleRegister = async e => {
    e.preventDefault();

    if (!validatePassword(password)) {
      toast.error("❌ Password must have uppercase, lowercase letters and at least 6 characters!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, photoURL: photoURL });
      toast.success("Registration Successful!");
      navigate("/login");
    } catch (err) {
      toast.error("❌ " + err.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error("❌ " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="w-full border p-2 rounded"
            onChange={e => setPhotoURL(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full mt-2 bg-red-600 text-white py-2 rounded hover:bg-red-500"
        >
          Register with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
