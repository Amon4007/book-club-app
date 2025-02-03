from app import db
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

# Define the many-to-many relationship table FIRST
club_members = db.Table('club_members',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('club_id', db.Integer, db.ForeignKey('club.id'), primary_key=True)
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        """Hash the password before storing it."""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Verify the password."""
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class Club(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    admin_id = db.Column(
        db.Integer,
        db.ForeignKey('user.id', name='fk_club_admin'),  # Add a named foreign key constraint
        nullable=False
    )
    members = db.relationship('User', secondary=club_members, lazy='dynamic')

    def __repr__(self):
        return f'<Club {self.name}>'


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'), nullable=False)

    def __repr__(self):
        return f'<Book {self.title}>'

class BookRecommendation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    recommended_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recommended_by_user = db.relationship('User', backref='recommendations')  # Track the user who recommended
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'), nullable=False)
    status = db.Column(db.String(50), default='pending')  # pending, approved, rejected

    def __repr__(self):
        return f'<Recommendation {self.book_title}>'

class ReadingProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)
    pages_read = db.Column(db.Integer, default=0)
    completed = db.Column(db.Boolean, default=False)

    user = db.relationship('User', backref='reading_progress')
    book = db.relationship('Book', backref='reading_progress')

    def __repr__(self):
        return f'<ReadingProgress User {self.user_id} - Book {self.book_id} - Pages Read {self.pages_read}>'
