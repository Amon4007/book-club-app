# Book Club App

## Description
The Book Club App is a web-based platform that allows users to join book clubs, recommend books, and interact with other members. The application is built with a **Flask** backend and a **React** frontend. By Amon

## Features
- User authentication (Login/Signup)
- Join and manage book clubs
- Recommend books to clubs
- View book and club listings
- REST API for fetching and managing data

## Tech Stack
### Frontend
- React
- Axios (for API requests)
- React Router (for navigation)
- Tailwind CSS (for styling)

### Backend
- Flask (Python)
- SQLAlchemy (Database ORM)
- Flask-CORS (Handling cross-origin requests)

## Installation
### Prerequisites
- Node.js and npm installed
- Python and Flask installed
- PostgreSQL or SQLite (for database)

### Setting up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   flask run
   ```
   The API should be available at `http://127.0.0.1:5000/api`

### Setting up the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   The app should be available at `http://localhost:3000`

## API Endpoints
### Books
- `GET /api/books` - Fetch all books
- `GET /api/books/<club_id>` - Fetch books for a specific club
- `POST /api/books/recommend` - Recommend a book

### Deployed link
- `https://vercel.com/amon4007s-projects/book-club-app-fcdj/DSvW4MVCT1pdqKEKgWtrK98S7hBT`

## Troubleshooting
- Ensure the Flask server is running before accessing the frontend.
- Use Postman or browser console to check API responses.
- If `axios` is missing, install it via `npm install axios`.
- Check browser console (F12) for errors and debug accordingly.

## Contribution
Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License
Copyright (c) [2025] [Amon Chirchir]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
