from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import BookRecommendation, Book, Club, User, ReadingProgress

main_bp = Blueprint('main', __name__)

# 📌 Home Route
@main_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Book Club App API!"})

# 📌 Fetch All Book Clubs (Only logged-in users)
@main_bp.route('/clubs', methods=['GET'])
@jwt_required()
def get_all_clubs():
    clubs = Club.query.all()
    return jsonify([
        {
            "id": club.id,
            "name": club.name,
            "description": club.description
        }
        for club in clubs
    ])

# 📌 Recommend a Book (Only logged-in users)
@main_bp.route('/recommend', methods=['POST'])
@jwt_required()
def recommend_book():
    data = request.json
    current_user = get_jwt_identity()

    # Validate input
    if not data.get('book_title') or not data.get('author') or not data.get('club_id'):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if club exists
    club = Club.query.get(data.get('club_id'))
    if not club:
        return jsonify({"error": "Club not found"}), 404

    # Create recommendation
    new_recommendation = BookRecommendation(
        book_title=data.get('book_title'),
        author=data.get('author'),
        recommended_by=current_user["id"],
        club_id=data.get('club_id')
    )
    db.session.add(new_recommendation)
    db.session.commit()

    return jsonify({"message": "Book recommendation submitted!"}), 201


# 📌 Approve/Reject a Book Recommendation (Only Club Admin Can Approve)
@main_bp.route('/recommend/<int:recommend_id>', methods=['PATCH'])
@jwt_required()
def update_recommendation(recommend_id):
    data = request.json
    current_user = get_jwt_identity()

    recommendation = BookRecommendation.query.get(recommend_id)
    if not recommendation:
        return jsonify({"message": "Recommendation not found"}), 404

    club = Club.query.get(recommendation.club_id)
    if club.admin_id != current_user["id"]:
        return jsonify({"error": "Only the club admin can approve/reject recommendations"}), 403

    recommendation.status = data.get('status', recommendation.status)

    if recommendation.status == "approved":
        new_book = Book(
            title=recommendation.book_title,
            author=recommendation.author,
            club_id=recommendation.club_id
        )
        db.session.add(new_book)

    db.session.commit()
    return jsonify({"message": f"Recommendation {recommendation.status}"}), 200

# 📌 View Approved Books in a Club (Only logged-in users)
@main_bp.route('/club/<int:club_id>/books', methods=['GET'])
@jwt_required()
def get_club_books(club_id):
    books = Book.query.filter_by(club_id=club_id).all()
    return jsonify([{"title": book.title, "author": book.author} for book in books])

# 📌 Start Tracking Reading Progress
@main_bp.route('/progress', methods=['POST'])
@jwt_required()
def start_progress():
    data = request.json
    current_user = get_jwt_identity()

    book = Book.query.get(data.get('book_id'))
    if not book:
        return jsonify({"error": "Book not found"}), 404

    existing_progress = ReadingProgress.query.filter_by(user_id=current_user["id"], book_id=book.id).first()
    if existing_progress:
        return jsonify({"message": "You are already tracking this book"}), 400

    new_progress = ReadingProgress(
        user_id=current_user["id"],
        book_id=book.id,
        pages_read=0,
        completed=False
    )
    db.session.add(new_progress)
    db.session.commit()

    return jsonify({"message": "Started tracking progress for this book!"}), 201

# 📌 Update Reading Progress
@main_bp.route('/progress/<int:book_id>', methods=['PATCH'])
@jwt_required()
def update_progress(book_id):
    data = request.json
    current_user = get_jwt_identity()

    progress = ReadingProgress.query.filter_by(user_id=current_user["id"], book_id=book_id).first()
    if not progress:
        return jsonify({"error": "No progress found for this book"}), 404

    progress.pages_read = data.get('pages_read', progress.pages_read)
    progress.completed = data.get('completed', progress.completed)
    db.session.commit()

    return jsonify({"message": "Reading progress updated!"}), 200

# 📌 Get User's Reading Progress
@main_bp.route('/progress', methods=['GET'])
@jwt_required()
def get_progress():
    current_user = get_jwt_identity()
    progress_list = ReadingProgress.query.filter_by(user_id=current_user["id"]).all()

    return jsonify([
        {
            "book_id": progress.book_id,
            "title": progress.book.title,
            "pages_read": progress.pages_read,
            "completed": progress.completed
        }
        for progress in progress_list
    ])
