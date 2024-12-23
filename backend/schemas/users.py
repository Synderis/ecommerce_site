from pydantic import BaseModel , EmailStr
from typing import List
from datetime import datetime
from schemas.carts import CartBase
from schemas.orders import OrderBase


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
    carts: List[CartBase]
    orders: List[OrderBase]

    class Config(BaseConfig):
        pass


class UserCreate(BaseModel):
    full_name: str
    username: str
    email: str
    password: str

    class Config(BaseConfig):
        pass
    

class UserReset(BaseModel):
    email: str
    password: str

    class Config(BaseConfig):
        pass


class UserUpdate(UserCreate):
    pass


class UserOut(BaseModel):
    message: str
    data: UserBase

    class Config(BaseConfig):
        pass


class UsersOut(BaseModel):
    message: str
    data: List[UserBase]

    class Config(BaseConfig):
        pass


class UserOutDelete(BaseModel):
    message: str
    data: UserBase

    class Config(BaseConfig):
        pass