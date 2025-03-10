from fastapi.security.http import HTTPAuthorizationCredentials
from passlib.context import CryptContext
from datetime import datetime, timedelta
from core.config import settings, blacklist
from jose import JWTError, jwt
from schemas.auth import TokenResponse
from fastapi.encoders import jsonable_encoder
from fastapi import HTTPException, Depends, status
from models.models import User
from sqlalchemy.orm import Session
from fastapi.security import HTTPBearer
from db.database import get_db
from utils.responses import ResponseHandler
import logging
logger = logging.getLogger(__name__)



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
auth_scheme = HTTPBearer()


def get_password_hash(password):
    return pwd_context.hash(password)


# Verify Hash Password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_reset_password_token(email: str):
    data = {"sub": email, "exp": datetime.utcnow() + timedelta(minutes=10)}
    token = jwt.encode(data, settings.secret_key, settings.algorithm)
    return token


# Create Access & Refresh Token
async def get_user_token(id: int, refresh_token=None):
    payload = {"id": id}

    access_token_expiry = timedelta(minutes=31)

    access_token = await create_access_token(payload, access_token_expiry)
    

    if not refresh_token:
        refresh_token = await create_refresh_token(payload)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=access_token_expiry.seconds
    )


# Create Access Token
async def create_access_token(data: dict, access_token_expiry=None):
    payload = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    payload.update({"exp": expire})

    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)


# Create Refresh Token
async def create_refresh_token(data):
    payload = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)  # expires in 24 hours
    payload.update({"exp": expire})
    return jwt.encode(data, settings.secret_key, settings.algorithm)


# Get Payload Of Token
def get_token_payload(token):
    try:
        return jwt.decode(token, settings.secret_key, [settings.algorithm])
    except JWTError:
        raise ResponseHandler.invalid_token('access')
    

def decode_reset_password_token(token: str):
    try:
        payload = jwt.decode(token, settings.secret_key,
                algorithms=[settings.algorithm])
        email: str = payload.get("sub")
        return email
    except JWTError:
        return None 


def get_current_user(token):
    user = get_token_payload(token.credentials)
    return user.get('id')


def check_admin_role(
        token: HTTPAuthorizationCredentials = Depends(auth_scheme),
        db: Session = Depends(get_db)):
    user = get_token_payload(token.credentials)
    user_id = user.get('id')
    role_user = db.query(User).filter(User.id == user_id).first()
    if role_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin role required")
    
def add_blacklist_token(token: str, db: Session = Depends(get_db)):
    try:
        # Add a token to the blacklist
        logger.info(token)
        blacklist.add_token(token)
    except:
        raise HTTPException(status_code=403, detail="Blacklist token failure")
    return

def check_auth(token: str):
    if blacklist.is_token_blacklisted(token):
        raise HTTPException(status_code=403, detail="Token is blacklisted")
    else:
        return True
