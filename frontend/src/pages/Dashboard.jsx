import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [bookClubs, setBookClubs] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch book clubs
        const clubsResponse = await axios.get(
          "http://127.0.0.1:5000/club", // Adjust the endpoint if needed
          { headers }
        );
        setBookClubs(clubsResponse.data);

        // Fetch recommended books
        const booksResponse = await axios.get(
          "http://127.0.0.1:5000/recommendations", // Adjust the endpoint if needed
          { headers }
        );
        setRecommendedBooks(booksResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center min-vh-100 text-white text-center"
        style={{
          backgroundImage: `url('https://source.unsplash.com/1920x1080/?library,books')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        ></div>
        <h2 className="fw-bold display-4 position-relative z-3">Loading your dashboard...</h2>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 text-white"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?reading,study')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div
        className="container position-relative z-3 bg-dark text-white p-5 rounded shadow-lg"
        style={{ maxWidth: "800px", marginTop: "50px" }}
      >
        <h2 className="display-5 fw-bold text-center mb-4">Your Dashboard</h2>

        {/* Book Clubs Section */}
        <div className="mb-4 p-4 bg-secondary rounded">
          <h3 className="h4 fw-bold mb-3">Your Book Clubs</h3>
          {bookClubs.length > 0 ? (
            <ul className="list-group">
              {bookClubs.map((club) => (
                <li key={club.id} className="list-group-item bg-dark text-white">
                  <Link
                    to={`/book-club/${club.id}`}
                    className="text-warning text-decoration-none"
                  >
                    {club.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              You’re not a member of any book clubs yet.{" "}
              <Link to="/book-club" className="text-warning text-decoration-none">
                Join one now!
              </Link>
            </p>
          )}
        </div>

        {/* Recommended Books Section */}
        <div className="p-4 bg-secondary rounded">
          <h3 className="h4 fw-bold mb-3">Recommended Books</h3>
          {recommendedBooks.length > 0 ? (
            <ul className="list-group">
              {recommendedBooks.map((book) => (
                <li key={book.id} className="list-group-item bg-dark text-white">
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))}
            </ul>
          ) : (
            <p>No book recommendations yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
