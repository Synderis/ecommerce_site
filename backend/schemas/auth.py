from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List
from schemas.carts import CartBase


# Base
class BaseConfig:
    from_attributes = True


class UserBase(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: str
    password: str
    role: str
    is_active: bool
    logged_in: bool
    created_at: datetime
    carts: CartBase

    class Config(BaseConfig):
        pass


class UserCreate(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: str
    password: str
    role: str
    is_active: bool
    logged_in: bool
    created_at: datetime

    class Config(BaseConfig):
        pass

class Signup(BaseModel):
    full_name: str
    username: str
    email: str
    password: str

    class Config(BaseConfig):
        pass
    
class SignUpResponse(BaseModel):
    message: str
    data: UserCreate


class UserOut(BaseModel):
    message: str
    data: UserBase

    class Config(BaseConfig):
        pass

class ResetPassword(BaseModel):
    reset_token: str
    new_password: str
    confirm_password: str
    
class EmailBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    message: str

    class Config:
        from_attributes = True
        
class EmailOut(BaseModel):
    message: str
    data: EmailBase

    class Config(BaseConfig):
        pass

# Token
class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = 'Bearer'
    expires_in: int