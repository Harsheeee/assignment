from pydantic_settings import BaseSettings
from typing import List
import json


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    Uses pydantic-settings for validation and type safety.
    """
    
    # Database configuration
    DATABASE_URL: str = "sqlite:///./backend_assignment.db"
    
    # JWT configuration
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS origins (stored as JSON string in env)
    BACKEND_CORS_ORIGINS: str = '["http://localhost:3000"]'
    
    # Admin user credentials for seeding
    ADMIN_EMAIL: str = "admin@example.com"
    ADMIN_PASSWORD: str = "admin123"
    
    @property
    def cors_origins(self) -> List[str]:
        """Parse CORS origins from JSON string"""
        return json.loads(self.BACKEND_CORS_ORIGINS)
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
