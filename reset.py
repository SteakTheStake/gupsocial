from gup import create_app

def reset_database():
  with app_context():
      # Drop all tables
      db.drop_all()
      print("All tables dropped.")

      # Recreate all tables
      db.create_all()
      print("All tables recreated.")

if __name__ == "__main__":
  reset_database()

# Created/Modified files during execution:
print("gup.db")  # Assuming SQLite is used and the database file is named database.db
