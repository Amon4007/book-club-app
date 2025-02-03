import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 text-white text-center"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?books')`, // Books-themed placeholder
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
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      ></div>

      {/* Content */}
      <div
        className="container position-relative z-3"
        style={{ zIndex: 2 }}
      >
        <h1 className="display-4 fw-bold mb-4">
          Welcome to the <span className="text-warning">Book Club </span>
        </h1>
        <p className="lead mb-5">
          Discover the joy of reading with like-minded enthusiasts. Join book
          clubs, share exciting reads, and track your literary adventures.
        </p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <Link
            to="/login"
            className="btn btn-primary btn-lg px-5 py-2 shadow-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn btn-success btn-lg px-5 py-2 shadow-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
