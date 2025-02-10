from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from models import db
from routes.user_routes import user_routes
from routes.club_routes import club_routes
from routes.book_routes import book_routes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///book_club.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# Register routes
app.register_blueprint(user_routes)
app.register_blueprint(club_routes)
app.register_blueprint(book_routes)

@app.route('/')
def home():
    return "Book Club API"

if __name__ == '__main__':
    app.run(port=5000, debug=True)