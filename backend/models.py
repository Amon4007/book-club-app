from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    clubs = db.relationship('ClubMember', backref='user', lazy=True)
    recommendations = db.relationship('BookRecommendation', backref='user', lazy=True)

class Club(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(200))
    members = db.relationship('ClubMember', backref='club', lazy=True)
    books = db.relationship('BookRecommendation', backref='club', lazy=True)

class ClubMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

class BookRecommendation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(50), default='pending')
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'), nullable=False)
    recommended_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)