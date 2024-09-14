from wsgi import create_app, db
from models import User  # Adjust the import paths as per your project structure

# Create an instance of your Flask app
app = create_app()  # Ensure this corresponds to your app factory

# Use the app context
with app.app_context():
    users = User.query.all()
    print(users)
