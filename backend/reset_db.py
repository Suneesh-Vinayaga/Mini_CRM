"""
Script to reset the database by dropping all tables and recreating them.
This ensures the database schema matches the current models.
"""
from app.database import engine, Base
from app import models

def reset_database():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("Database reset complete!")

if __name__ == "__main__":
    reset_database()
