import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookClub = () => {
  const { id } = useParams(); // Get club ID from URL
  const [club, setClub] = useState(null);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch club details
        const clubResponse = await axios.get(
          `http://127.0.0.1:5000/club/${id}`,
          { headers }
        );
        setClub(clubResponse.data);

        // Fetch approved books
        const booksResponse = await axios.get(
          `http://127.0.0.1:5000/club/${id}/books`,
          { headers }
        );
        setBooks(booksResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch book club details:", error);
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(
        `http://127.0.0.1:5000/recommend`,
        { ...newBook, club_id: id },
        { headers }
      );

      setMessage("Book recommendation submitted successfully!");
      setNewBook({ title: "", author: "" }); // Reset form
    } catch (error) {
      console.error("Failed to submit recommendation:", error);
      setMessage("Failed to recommend the book. Try again.");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center min-vh-100 text-white"
        style={{
          backgroundImage: `url('https://source.unsplash.com/1920x1080/?library,reading')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-center fw-bold">Loading club details...</h2>
      </div>
    );
  }

  return (
    <div
      className="container-fluid min-vh-100 text-white"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1920x1080/?books,discussion')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>

      <div className="container position-relative z-3 py-5">
        {/* Book Club Details */}
        {club && (
          <div className="mb-5 text-center">
            <h2 className="fw-bold display-4">{club.name}</h2>
            <p className="lead">{club.description}</p>
          </div>
        )}

        {/* Approved Books */}
        <div className="mb-5 bg-dark p-4 rounded shadow">
          <h3 className="fw-bold border-bottom pb-2">Approved Books</h3>
          {books.length > 0 ? (
            <ul className="list-group">
              {books.map((book) => (
                <li key={book.id} className="list-group-item bg-secondary text-white">
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-warning">No books have been approved yet.</p>
          )}
        </div>

        {/* Recommend a Book */}
        <div className="bg-dark p-4 rounded shadow">
          <h3 className="fw-bold border-bottom pb-2">Recommend a Book</h3>
          {message && <p className="alert alert-success">{message}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author:</label>
              <input
                type="text"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Recommend Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookClub;
