"""
Database initialization script.
Creates database tables and seeds initial admin user.
"""
import sys
sys.path.insert(0, '/home/harshit/Documents/assgn/backend')

from app.database import engine, SessionLocal, Base
from app.models import User, Task
from app.core.security import get_password_hash
from app.config import settings

def init_db():
    """Initialize database with tables and seed data"""
    # Drop all tables first to ensure clean state
    Base.metadata.drop_all(bind=engine)
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully")
    
    # Seed admin user
    db = SessionLocal()
    try:
        # Check if admin already exists
        admin = db.query(User).filter(User.email == settings.ADMIN_EMAIL).first()
        if not admin:
            hashed_password = get_password_hash(settings.ADMIN_PASSWORD)
            admin_user = User(
                email=settings.ADMIN_EMAIL,
                username="admin",
                hashed_password=hashed_password,
                role="admin",
                is_active=True
            )
            db.add(admin_user)
            db.commit()
            print(f"Admin user created: {settings.ADMIN_EMAIL}")
            print(f"   Password: {settings.ADMIN_PASSWORD}")
        else:
            print(f"Admin user already exists: {settings.ADMIN_EMAIL}")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
