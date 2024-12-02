from fastapi import HTTPException, Depends, status
from fastapi.security.oauth2 import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.models import User
from db.database import get_db
from starlette.background import BackgroundTasks
from core.security import get_password_hash,verify_password, get_user_token, get_token_payload, add_blacklist_token, create_reset_password_token, decode_reset_password_token
from utils.responses import ResponseHandler
from schemas.auth import Signup
from sqlalchemy.exc import IntegrityError
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
import os
from dotenv import load_dotenv

load_dotenv()


import logging
logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get("SMTP_LOGIN"),
    MAIL_PASSWORD=os.environ.get("SMTP_PASSWORD"),
    MAIL_PORT=os.environ.get("SMTP_PORT"),
    MAIL_SERVER=os.environ.get("SMTP_SERVER"),
    MAIL_STARTTLS=True,
    MAIL_FROM='synderisdev@gmail.com',
    MAIL_SSL_TLS=False
)


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
        user.logged_in = True
        db.commit()
        db.refresh(user)

        return await get_user_token(id=user.id)
    
    @staticmethod
    async def logout(token, db: Session = Depends(get_db)):
        try:
            logout_user = get_token_payload(token.credentials).get('id')
            add_blacklist_token(token.credentials)
            user = db.query(User).filter(User.id == logout_user).first()
            user.logged_in = False
            db.commit()
            db.refresh(user)
            # Revoke the token by adding it to the blacklist
            return ResponseHandler.create_success(user.username, user.id, user)
        except IntegrityError as e:
                # Handle the unique constraint error
                return ResponseHandler.create_failure(user, str(e))

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
    async def forgot_password(email, db):
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise ResponseHandler.not_found_error('User', email)
        if user.role == 'admin':
            raise ResponseHandler.not_found_error('User', email)
        new_secret_token = await create_reset_password_token(user.email)
        forget_url_link =  f'http://localhost:8000/reset-password/{new_secret_token}'
        email_body = { "company_name": "FastAPI",
                    "link_expiry_min": 10,
                    "reset_link": forget_url_link }
        message = MessageSchema(
            subject="Password Reset Instructions",
            recipients=[user.email],
            template_body=email_body,
            subtype=MessageType.html
        )
        fm = FastMail(conf)
        try:
            await fm.send_message(message)
        except Exception as e:
            return ResponseHandler.create_failure(user.email, str(e))
        
        return ResponseHandler.create_success(user.username, user.id, user)
    
    @staticmethod
    async def reset_password(reset_data, db):
        email = decode_reset_password_token(reset_data.reset_token)

        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise ResponseHandler.not_found_error('User', email)

        hashed_password = get_password_hash(reset_data.new_password)
        user.password = hashed_password
        db.commit()
        db.refresh(user)
        return ResponseHandler.create_success(user.username, user.id, user)


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
    
    
    @staticmethod
    async def contact(email_data):
#         template = """
#         <html>
#         <body>


# <p>Hi !!!
#         <br>Thanks for using fastapi mail, keep using it..!!!</p>


#         </body>
#         </html>
#         """  
        message = MessageSchema(
            subject='Contact Form Submission',
            recipients=['toccidylan@gmail.com'],
            body=email_data.message,
            subtype=MessageType.html
        )
        fm = FastMail(conf)
        try:
            await fm.send_message(message)
        except Exception as e:
            return ResponseHandler.create_failure(email_data, str(e))
        return ResponseHandler.perm_success()
    


