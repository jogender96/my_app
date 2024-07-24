from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    CORS(app)

    with app.app_context():
        from . import routes  # Import routes
        from .models import TestCase  # Import models

        db.create_all()  # Create database tables for our data models

    return app
