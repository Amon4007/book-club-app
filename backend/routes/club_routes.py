from flask import Blueprint, request, jsonify
from models import db, Club, ClubMember

club_routes = Blueprint('club_routes', __name__)

@club_routes.route('/clubs', methods=['GET'])
def get_clubs():
    clubs = Club.query.all()
    return jsonify([{
        'id': club.id,
        'name': club.name,
        'description': club.description
    } for club in clubs])

@club_routes.route('/clubs', methods=['POST'])
def create_club():
    data = request.get_json()
    new_club = Club(name=data['name'], description=data['description'])
    db.session.add(new_club)
    db.session.commit()
    return jsonify({
        'id': new_club.id,
        'name': new_club.name,
        'description': new_club.description
    }), 201

@club_routes.route('/clubs/<int:club_id>/members', methods=['POST'])
def add_member(club_id):
    data = request.get_json()
    new_member = ClubMember(user_id=data['user_id'], club_id=club_id, is_admin=data.get('is_admin', False))
    db.session.add(new_member)
    db.session.commit()
    return jsonify({
        'id': new_member.id,
        'user_id': new_member.user_id,
        'club_id': new_member.club_id,
        'is_admin': new_member.is_admin
    }), 201