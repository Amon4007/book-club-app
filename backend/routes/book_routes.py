from flask import Blueprint, request, jsonify
from models import db, BookRecommendation, Club

book_routes = Blueprint('book_routes', __name__)

@book_routes.route('/clubs/<int:club_id>/books', methods=['GET'])
def get_books(club_id):
    books = BookRecommendation.query.filter_by(club_id=club_id).all()
    return jsonify([{
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'status': book.status,
        'recommended_by': book.recommended_by
    } for book in books])

@book_routes.route('/clubs/<int:club_id>/books', methods=['POST'])
def recommend_book(club_id):
    data = request.get_json()
    new_book = BookRecommendation(
        title=data['title'],
        author=data['author'],
        club_id=club_id,
        recommended_by=data['user_id'],
        status='pending'
    )
    db.session.add(new_book)
    db.session.commit()
    return jsonify({
        'id': new_book.id,
        'title': new_book.title,
        'author': new_book.author,
        'status': new_book.status
    }), 201

@book_routes.route('/books/<int:book_id>', methods=['PATCH'])
def update_book_status(book_id):
    data = request.get_json()
    book = BookRecommendation.query.get(book_id)
    book.status = data['status']
    db.session.commit()
    return jsonify({
        'id': book.id,
        'title': book.title,
        'author': book.author,
        'status': book.status
    })