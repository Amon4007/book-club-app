import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard"); // Redirect to Dashboard after login
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 text-white"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?focus,calm')`, // Books/Focus themed background
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      ></div>

      {/* Form Card */}
      <div
        className="container position-relative z-3 bg-dark text-white p-4 rounded shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <h2 className="mb-4 fw-bold">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-warning fw-bold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
