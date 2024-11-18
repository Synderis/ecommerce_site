from fastapi import HTTPException, Depends, status
from fastapi.security.oauth2 import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.models import User
from db.database import get_db
from core.security import verify_password, get_user_token, get_token_payload
from core.security import get_password_hash
from utils.responses import ResponseHandler
from schemas.auth import Signup
from sqlalchemy.exc import IntegrityError


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class AuthService:
    @staticmethod
    async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
        user = db.query(User).filter(User.username == user_credentials.username).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

        if not verify_password(user_credentials.password, user.password):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")
        
        token = await get_user_token(id=user.id)
        print(token)  # This will print the actual token value

        return await get_user_token(id=user.id)

    @staticmethod
    async def signup(db: Session, user: Signup):
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
                return ResponseHandler.create_failure(user, str(e))

    @staticmethod
    async def get_refresh_token(token, db):
        payload = get_token_payload(token)
        user_id = payload.get('id', None)
        if not user_id:
            raise ResponseHandler.invalid_token('refresh')

        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ResponseHandler.invalid_token('refresh')

        return await get_user_token(id=user.id, refresh_token=token)