import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <h1>Welcome to the Book Club </h1>
            <p>Join a club, recommend books, and participate in group reading activities!</p>
            <Link to="/clubs/1" className="btn btn-primary">Go to Club Page</Link>
        </div>
    );
};

export default Home;