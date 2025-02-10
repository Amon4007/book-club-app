import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = ({ clubId }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = () => {
        axios.get(`http://localhost:5000/clubs/${clubId}/books`)
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch books.');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBooks();
    }, [clubId]);

    const updateStatus = (bookId, status) => {
        axios.patch(`http://localhost:5000/books/${bookId}`, { status })
            .then(() => fetchBooks())
            .catch(error => console.error('Update error:', error));
    };

    const deleteBook = (bookId) => {
        axios.delete(`http://localhost:5000/books/${bookId}`)
            .then(() => fetchBooks())
            .catch(error => console.error('Delete error:', error));
    };

    if (loading) return <div className="text-muted">Loading books...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <div className="mt-4">
            <h3 className="mb-3">Reading List</h3>
            <ul className="list-group">
                {books.map(book => (
                    <li key={book.id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{book.title}</div>
                            <small className="text-muted">by {book.author}</small>
                            <span className={`badge rounded-pill ms-2 ${
                                book.status === 'approved' ? 'bg-success' :
                                book.status === 'rejected' ? 'bg-danger' : 'bg-warning'
                            }`}>
                                {book.status.toUpperCase()}
                            </span>
                        </div>
                        <div className="btn-group">
                            <button
                                onClick={() => updateStatus(book.id, 'approved')}
                                className={`btn btn-sm ${
                                    book.status === 'approved'
                                    ? 'btn-outline-success disabled'
                                    : 'btn-outline-success'
                                }`}
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => updateStatus(book.id, 'rejected')}
                                className={`btn btn-sm ${
                                    book.status === 'rejected'
                                    ? 'btn-outline-danger disabled'
                                    : 'btn-outline-danger'
                                }`}
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => deleteBook(book.id)}
                                className="btn btn-outline-dark btn-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;