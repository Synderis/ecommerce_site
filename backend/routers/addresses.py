from fastapi import APIRouter, Depends, Query, status
from db.database import get_db
from services.carts import CartService
from services.addresses import AddressService
from sqlalchemy.orm import Session
from schemas.carts import CartCreate, CartUpdate, CartOut, CartOutDelete, CartsOutList, CartItemCreate
from schemas.addresses import AddressCreate, AddressUpdate
from core.security import get_current_user
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials

router = APIRouter(tags=["Addresses"], prefix="/address")
auth_scheme = HTTPBearer()


# Get All Carts
@router.get("/", status_code=status.HTTP_200_OK, response_model=CartsOutList)
def get_all_addresses(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    token: HTTPAuthorizationCredentials = Depends(auth_scheme)
):
    return CartService.get_addresses(token, db, page, limit)


# Get Cart By User ID
@router.get("/{user_id}", status_code=status.HTTP_200_OK, response_model=CartOut)
def get_address(
        user_id: int,
        db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    return AddressService.get_address(token, db, user_id)


# Create New Cart
@router.post("/", status_code=status.HTTP_201_CREATED, response_model=CartOut)
def create_address(
        address: AddressCreate, db: Session = Depends(get_db),
        token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    
    return AddressService.create_address(token, db, address)



# Update Existing Cart
# @router.put("/{user_id}", status_code=status.HTTP_200_OK, response_model=CartOut)
# def update_cart(
#         user_id: int,
#         updated_address: AddressUpdate,
#         db: Session = Depends(get_db),
#         token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
#     return CartService.update_cart(token, db, user_id, updated_address)


# Delete Cart By User ID
# @router.delete("/{cart_id}", status_code=status.HTTP_200_OK, response_model=CartOutDelete)
# def delete_cart(
#         cart_id: int, db: Session = Depends(get_db),
#         token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
#     return CartService.delete_cart(token, db, cart_id)