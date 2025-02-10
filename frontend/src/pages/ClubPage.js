import React from 'react';
import { useParams } from 'react-router-dom';
import BookRecommendationForm from '../components/BookRecommendationForm';
import BookList from '../components/BookList';

const ClubPage = () => {
    const { clubId } = useParams();
    const userId = 1; // Replace with dynamic ID later

    return (
        <div className="container">
            {/* Header */}
            <h1 className="my-4">Club Dashboard</h1>

            {/* Recommendation Form in a Card */}
            <div className="card shadow mb-5">
                <div className="card-body">
                    <h2 className="card-title mb-4">Recommend a Book</h2>
                    <BookRecommendationForm clubId={clubId} userId={userId} />
                </div>
            </div>

            {/* Reading List Section */}
            <div className="mt-5">
                <h2>Reading List</h2>
                <BookList clubId={clubId} />
            </div>
        </div>
    );
};

export default ClubPage;