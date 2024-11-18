from pydantic import BaseModel , EmailStr
from typing import List
from datetime import datetime
from schemas.carts import CartBase


class BaseConfig:
    from_attributes = True


class OrderBase(BaseModel):
    id: int
    order_timestamp: datetime
    user_id: int
    cart_id: int
    item_total: float
    tax_total: float
    shipping_total: float
    order_total: float
    payment_type: str
    cart_contents: CartBase

    class Config(BaseConfig):
        pass


class OrderOutBase(BaseModel):
    id: int
    order_timestamp: datetime
    user_id: int
    cart_id: int
    item_total: float
    tax_total: float
    shipping_total: float
    order_total: float
    payment_type: str
    cart_contents: CartBase

    class Config(BaseConfig):
        pass


# Get Order
class OrderOut(BaseModel):
    message: str
    data: OrderBase

    class Config(BaseConfig):
        pass

class OrdersOutList(BaseModel):
    message: str
    data: List[OrderBase]

    class Config(BaseConfig):
        pass

class OrdersUserOutList(BaseModel):
    message: str
    data: List[OrderBase]

    class Config(BaseConfig):
        pass

class OrderCreate(BaseModel):
    pass

    class Config(BaseConfig):
        pass

# Delete Order
class OrderOutDelete(BaseModel):
    message: str
    data: OrderOutBase