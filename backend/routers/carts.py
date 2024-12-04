from fastapi import APIRouter, Depends, Query, status
from db.database import get_db
from services.carts import CartService
from sqlalchemy.orm import Session
from schemas.carts import CartCreate, CartUpdate, CartOut, CartOutDelete, CartsOutList, CartItemCreate
from core.security import get_current_user, check_admin_role
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials

router = APIRouter(tags=["Carts"], prefix="/carts")
auth_scheme = HTTPBearer()


# Get All Carts
@router.get("/", status_code=status.HTTP_200_OK, response_model=CartsOutList)
def get_all_carts(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    token: HTTPAuthorizationCredentials = Depends(auth_scheme)
):
    return CartService.get_all_carts(token, db, page, limit)


# Get Cart By User ID
@router.get("/{cart_id}", status_code=status.HTTP_200_OK, response_model=CartOut)
def get_cart(
        cart_id: int,
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return CartService.get_cart(token, db, cart_id)


@router.get("/active", status_code=status.HTTP_200_OK, response_model=CartOut)
def get_active_cart(
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return CartService.get_active_cart(token, db)


# Create New Cart
@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=CartOut)
def create_cart(
        cart: CartCreate, db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return CartService.create_cart(token, db, cart)


# Add Product To Cart
@router.put("/{cart_id}/add", status_code=status.HTTP_200_OK, response_model=CartOut)
def add_to_cart(
        cart_id: int,
        cart_item: CartItemCreate,
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return CartService.add_to_cart(token, db, cart_id, cart_item)


# Update Existing Cart
@router.put("/{cart_id}", status_code=status.HTTP_200_OK, response_model=CartOut)
def update_cart(
        cart_id: int,
        updated_cart: CartUpdate,
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return CartService.update_cart(token, db, cart_id, updated_cart)


# Delete Cart By User ID
@router.delete("/{cart_id}", status_code=status.HTTP_200_OK, response_model=CartOutDelete, dependencies=[Depends(check_admin_role)])
def delete_cart(
        cart_id: int, db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return CartService.delete_cart(token, db, cart_id)