from pydantic import BaseModel, validator
from datetime import datetime
from typing import List, Optional, ClassVar
from schemas.categories import CategoryBase


# Base Models
class BaseConfig:
    from_attributes = True


class AddressBase(BaseModel):
    id: int
    user_id: int
    order_id: int
    full_name: str
    street_address: str
    city: str
    state: str
    country: str
    zip_code: str
    address_type: str

    class Config(BaseConfig):
        pass


# Create Product
class AddressCreate(BaseModel):
    full_name: str
    street_address: str
    city: str
    state: str
    country: str
    zip_code: str
    address_type: str

    class Config(BaseConfig):
        pass


# Update Product
class AddressUpdate(AddressCreate):
    pass


# Get Products
class AddressOut(BaseModel):
    message: str
    data: AddressBase

    class Config(BaseConfig):
        pass


class AddressesOut(BaseModel):
    message: str
    data: List[AddressBase]

    class Config(BaseConfig):
        pass


# Delete Product
class AddressDelete(AddressBase):
    address: ClassVar[AddressBase]


class AddressOutDelete(BaseModel):
    message: str
    data: AddressDelete