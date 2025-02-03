# Book Club App

Welcome to the **Book Club App**! This is a full-stack application that allows users to join book clubs, recommend books, and track their reading progress. The app uses a Flask backend and a React frontend, with Bootstrap for styling to ensure a seamless and responsive user experience.

---

## Features

### **User Features**
- **Sign Up/Login**: Secure user authentication using JWT.
- **Dashboard**: View your joined book clubs and recommended books.
- **Book Clubs**: Explore book clubs, view approved books, and recommend new ones.
- **Responsive Design**: Works seamlessly on both mobile and desktop devices.

### **Admin Features**
- Approve or reject book recommendations.
- Manage book club details.

---

## Technologies Used

### **Backend**
- **Flask**: For building the RESTful API.
- **SQLAlchemy**: For ORM and database management.
- **Flask-Migrate**: For database migrations.
- **Flask-JWT-Extended**: For user authentication.
- **Flask-CORS**: For handling cross-origin requests.

### **Frontend**
- **React**: For building the user interface.
- **React Router**: For client-side routing.
- **Bootstrap**: For responsive and clean styling.
- **Axios**: For HTTP requests to the backend.

### **Database**
- **SQLite**: Lightweight database for development (can be upgraded to PostgreSQL or MySQL for production).

---

## Installation

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-club-app.git
   cd book-club-app/backend
   ```
2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up the database:
   ```bash
   flask db upgrade
   ```
5. Run the server:
   ```bash
   flask run
   ```

### **Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm start
   ```

---

## Usage

1. **Sign Up**: Create an account on the signup page.
2. **Login**: Log in using your credentials.
3. **Dashboard**: View your joined book clubs and recommended books.
4. **Book Clubs**:
   - View details about the book club.
   - Recommend books for approval.

---

## Project Structure

```
book-club-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py       # Flask app factory
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── routes/           # API routes
│   │   ├── config.py         # App configuration
│   ├── migrations/           # Database migrations
│   ├── requirements.txt      # Backend dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page-level React components
│   │   ├── services/         # API utility functions
│   ├── package.json          # Frontend dependencies
```

---


## Future Improvements

- Add profile management for users.
- Introduce admin panel for managing book clubs and user activity.
- Add real-time notifications for approved/rejected book recommendations.
- Implement advanced analytics for book clubs.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

