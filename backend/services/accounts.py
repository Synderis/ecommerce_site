from sqlalchemy.orm import Session
from models.models import User
from utils.responses import ResponseHandler
from core.security import get_password_hash, get_token_payload, check_auth


class AccountService:
    @staticmethod
    def get_my_info(db: Session, token):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token.credentials, 'Auth failed')
        user_id = get_token_payload(token.credentials).get('id')
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            ResponseHandler.not_found_error("User", user_id)
        return ResponseHandler.get_single_success(user.username, user.id, user)

    @staticmethod
    def edit_my_info(db: Session, token, updated_user):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_token_payload(token.credentials).get('id')
        db_user = db.query(User).filter(User.id == user_id).first()
        if not db_user:
            ResponseHandler.not_found_error("User", user_id)

        for key, value in updated_user.model_dump().items():
            setattr(db_user, key, value)

        db.commit()
        db.refresh(db_user)
        return ResponseHandler.update_success(db_user.username, db_user.id, db_user)

    @staticmethod
    def remove_my_account(db: Session, token):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_token_payload(token.credentials).get('id')
        db_user = db.query(User).filter(User.id == user_id).first()
        if not db_user:
            ResponseHandler.not_found_error("User", user_id)
        db.delete(db_user)
        db.commit()
        return ResponseHandler.delete_success(db_user.username, db_user.id, db_user)