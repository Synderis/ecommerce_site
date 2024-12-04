from fastapi import APIRouter, Depends, Query, status
from db.database import get_db
from services.users import UserService
from sqlalchemy.orm import Session
from schemas.users import UserCreate, UserOut, UsersOut, UserOutDelete, UserUpdate
from core.security import check_admin_role


router = APIRouter(tags=["Users"], prefix="/users")


# Get All Users
@router.get(
    "/admin-users",
    status_code=status.HTTP_200_OK,
    response_model=UsersOut,
    dependencies=[Depends(check_admin_role)])
def get_all_users(
    db: Session = Depends(get_db),
):
    return UserService.get_all_users(db)


# Get User By ID
@router.get(
    "/get-user/{user_id}",
    status_code=status.HTTP_200_OK,
    response_model=UserOut,
    dependencies=[Depends(check_admin_role)])
def get_user(user_id: int, db: Session = Depends(get_db)):
    return UserService.get_user(db, user_id)


# Create New User
@router.post(
    "/create-user",
    status_code=status.HTTP_201_CREATED,
    response_model=UserOut,
    dependencies=[Depends(check_admin_role)])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return UserService.create_user(db, user)


# Update Existing User
@router.put(
    "/update-user/{user_id}",
    status_code=status.HTTP_200_OK,
    response_model=UserOut,
    dependencies=[Depends(check_admin_role)])
def update_user(user_id: int, updated_user: UserUpdate, db: Session = Depends(get_db)):
    return UserService.update_user(db, user_id, updated_user)


# Delete User By ID
@router.delete(
    "/delete-user/{user_id}",
    status_code=status.HTTP_200_OK,
    response_model=UserOutDelete,
    dependencies=[Depends(check_admin_role)])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return UserService.delete_user(db, user_id)