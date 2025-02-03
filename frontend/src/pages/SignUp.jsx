import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", { username, email, password });
      if (response.data.message) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to login after successful registration
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?reading,library')`,
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
        className="container position-relative bg-dark text-white p-4 rounded shadow-lg"
        style={{
          maxWidth: "400px",
          zIndex: 2,
        }}
      >
        <h2 className="mb-4 fw-bold text-center">Create an Account</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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

          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-warning fw-bold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
