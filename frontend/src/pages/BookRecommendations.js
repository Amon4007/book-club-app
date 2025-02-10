import React from 'react';
import { useParams } from 'react-router-dom';
import BookList from '../components/BookList';

const BookRecommendations = () => {
    const { clubId } = useParams();

    return (
        <div className="container">
            <h1>Book Recommendations</h1>
            <BookList clubId={clubId} />
        </div>
    );
};

export default BookRecommendations;