from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from gup import create_app
from gup.config import Config

# Create the app using the factory function
app = create_app(Config)

# Ensure the SQLAlchemy URI is set
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gup.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy and Migrate with the app
migrate = Migrate(app)

# Import your models here
# from gup.models import User, Post

if __name__ == '__main__':
    app.run()
