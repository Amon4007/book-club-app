from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt  # Import Bcrypt
from app.config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()  # Initialize Bcrypt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    jwt.init_app(app)
    bcrypt.init_app(app)  # Attach Bcrypt to the app

    # Register Blueprints
    from app.routes.main import main_bp  # Main book club routes
    from app.routes.auth import auth_bp  # Authentication routes

    app.register_blueprint(main_bp)  # Default book club routes
    app.register_blueprint(auth_bp, url_prefix='/auth')  # Authentication routes under /auth

    return app
