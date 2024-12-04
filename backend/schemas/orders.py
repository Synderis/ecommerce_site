from pydantic import BaseModel , EmailStr, Field
from typing import List, Optional
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
    subtotal: int
    product: ProductBaseCart


class OrderBase(BaseModel):
    id: int
    created_at: datetime
    completed_at: Optional[datetime] = None
    shipped_at: Optional[datetime] = None
    user_id: int
    item_total: int
    tax_total: int
    shipping_total: int
    order_total: int
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
    created_at: datetime
    completed_at: Optional[datetime] = None
    shipped_at: Optional[datetime] = None
    user_id: int
    item_total: int
    tax_total: int
    shipping_total: int
    order_total: int
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