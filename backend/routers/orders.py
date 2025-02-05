from fastapi import APIRouter, Depends, Query, status
from db.database import get_db
# from services.carts import CartService
from services.orders import OrderService
from sqlalchemy.orm import Session
# from schemas.carts import CartCreate, CartUpdate, CartOut, CartOutDelete, CartsOutList, CartItemCreate
from schemas.orders import OrderOut, OrdersOutList, OrderOutDelete, OrderCreate, OrderItemsOut
from core.security import get_current_user, check_admin_role
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials

router = APIRouter(tags=["Orders"], prefix="/orders")
auth_scheme = HTTPBearer()


# Get All Orders
@router.get("/admin-orders", status_code=status.HTTP_200_OK, response_model=OrdersOutList, dependencies=[Depends(check_admin_role)])
def get_all_orders(
    db: Session = Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(auth_scheme)
):
    return OrderService.get_all_orders(token, db)

@router.get("/{order_id}/admin-order-items", status_code=status.HTTP_200_OK, response_model=OrdersOutList, dependencies=[Depends(check_admin_role)])
def get_all_orders(
    order_id: int,
    db: Session = Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(auth_scheme)
):
    return OrderService.get_all_order_items(token, db, order_id)

@router.get("/current-order", status_code=status.HTTP_200_OK, response_model=OrderOut)
def get_current_order(
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return OrderService.get_current_order(token, db)

@router.put("/{order_id}/update-order", status_code=status.HTTP_200_OK, dependencies=[Depends(check_admin_role)])
def update_order(
        order_id: int,
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return OrderService.update_order(token, db, order_id)

# Get Order By User ID
@router.get("/{order_id}/user-order", status_code=status.HTTP_200_OK, response_model=OrderOut)
def get_order(
        order_id: int,
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return OrderService.get_order(token, db, order_id)

@router.get("/{order_id}/items", status_code=status.HTTP_200_OK, response_model=OrderItemsOut)
def get_order_items(
        order_id: int,
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return OrderService.get_order_items(token, db, order_id)

# Get Order By User ID
@router.get("/user-orders/", status_code=status.HTTP_200_OK, response_model=OrdersOutList)
def get_order(
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return OrderService.get_user_orders(token, db)

# Create New Order
@router.post("/{cart_id}/create", status_code=status.HTTP_201_CREATED, response_model=OrderOut)
def create_order(
        cart_id: int,
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return OrderService.create_order(token, db, cart_id)

# Delete Order By User ID
@router.delete("/{order_id}", status_code=status.HTTP_200_OK, dependencies=[Depends(check_admin_role)])
def delete_order(
        order_id: int, db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return OrderService.delete_order(token, db, order_id)