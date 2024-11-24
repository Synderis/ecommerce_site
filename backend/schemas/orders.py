from pydantic import BaseModel , EmailStr, Field
from typing import List
from datetime import datetime
from schemas.carts import CartBase
from schemas.products import ProductBase, CategoryBase


class BaseConfig:
    from_attributes = True
    
class ProductBaseCart(ProductBase):
    category: CategoryBase = Field(exclude=True)

    class Config(BaseConfig):
        pass

# Base Cart & Cart_Item
class OrderItemBase(BaseModel):
    id: int
    product_id: int
    quantity: int
    subtotal: float
    product: ProductBaseCart


class OrderBase(BaseModel):
    id: int
    order_timestamp: datetime
    user_id: int
    item_total: float
    tax_total: float
    shipping_total: float
    order_total: float
    payment_type: str
    completed: bool
    shipped: bool
    order_items: List[OrderItemBase]

    class Config(BaseConfig):
        pass
    
class OrderItemsOut(BaseModel):
    message: str
    data: List[OrderItemBase]

    class Config(BaseConfig):
        pass


class OrderOutBase(BaseModel):
    id: int
    order_timestamp: datetime
    user_id: int
    item_total: float
    tax_total: float
    shipping_total: float
    order_total: float
    payment_type: str
    completed: bool
    shipped: bool
    order_items: List[OrderItemBase]

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

# class OrderResponse(BaseModel):
#     id: int
#     user_id: int

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