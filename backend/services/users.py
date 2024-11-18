from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from models.models import User
from schemas.users import UserCreate, UserUpdate
from utils.responses import ResponseHandler
from core.security import get_password_hash


class UserService:
    @staticmethod
    def get_all_users(db: Session, page: int, limit: int, search: str = "", role: str = "user"):
        users = db.query(User).order_by(User.id.asc()).filter(
            User.username.contains(search), User.role == role).limit(limit).offset((page - 1) * limit).all()
        return {"message": f"Page {page} with {limit} users", "data": users}

    @staticmethod
    def get_user(db: Session, user_id: int):
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            ResponseHandler.not_found_error("User", user_id)
        return ResponseHandler.get_single_success(user.username, user_id, user)

    @staticmethod
    def create_user(db: Session, user: UserCreate):
        try:
            hashed_password = get_password_hash(user.password)
            user.password = hashed_password
            db_user = User(id=None, **user.model_dump())
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return ResponseHandler.create_success(db_user.username, db_user.id, db_user)
        except IntegrityError as e:
            # Handle the unique constraint error
            return ResponseHandler.create_failure(user,str(e))
            # if "users_email_key" in str(e):
            #     return HTTPException(status_code=400, detail="Email already exists")
            # elif "users_username_key" in str(e):
            #     return HTTPException(status_code=400, detail="Username already exists")
            # else:
            #     # Handle other integrity errors
            #     return HTTPException(status_code=500, detail="Internal Server Error")

    @staticmethod
    def update_user(db: Session, user_id: int, updated_user: UserUpdate):
        db_user = db.query(User).filter(User.id == user_id).first()
        if not db_user:
            ResponseHandler.not_found_error("User", user_id)

        for key, value in updated_user.model_dump().items():
            setattr(db_user, key, value)

        db.commit()
        db.refresh(db_user)
        return ResponseHandler.update_success(db_user.username, db_user.id, db_user)

    @staticmethod
    def delete_user(db: Session, user_id: int):
        db_user = db.query(User).filter(User.id == user_id).first()
        if not db_user:
            ResponseHandler.not_found_error("User", user_id)
        db.delete(db_user)
        db.commit()
        return ResponseHandler.delete_success(db_user.username, db_user.id, db_user)