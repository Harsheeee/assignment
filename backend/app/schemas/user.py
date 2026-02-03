from pydantic import BaseModel, EmailStr, constr, Field
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    """Base user schema with common fields"""
    email: EmailStr
    username: constr(min_length=3, max_length=50)


class UserCreate(UserBase):
    """Schema for user registration request"""
    password: constr(min_length=6, max_length=100)


class UserLogin(BaseModel):
    """Schema for user login request"""
    email: EmailStr
    password: str


class UserResponse(UserBase):
    """Schema for user response (without password)"""
    id: int
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """Schema for decoded token data"""
    email: Optional[str] = None
