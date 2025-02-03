from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app import db, bcrypt
from app.models import User

auth_bp = Blueprint('auth', __name__)

# 📌 User Registration
@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.json

    # Validate required fields
    if not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "All fields are required"}), 400

    # Check if the email or username already exists
    if User.query.filter_by(email=data.get('email')).first():
        return jsonify({"error": "Email already registered"}), 400

    if User.query.filter_by(username=data.get('username')).first():
        return jsonify({"error": "Username already taken"}), 400

    # Hash the password and create a new user
    hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    new_user = User(
        username=data.get('username'),
        email=data.get('email'),
        password_hash=hashed_password
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Registration failed due to an internal error"}), 500


# 📌 User Login
@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.json

    # Validate email and password
    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email and password are required"}), 400

    # Check if user exists
    user = User.query.filter_by(email=data.get('email')).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, data.get('password')):
        return jsonify({"error": "Invalid credentials. Please try again."}), 401

    # Generate access token
    access_token = create_access_token(identity={"id": user.id, "username": user.username})
    return jsonify({"access_token": access_token, "message": "Login successful"}), 200
