from sqlalchemy.orm import Session
from models.models import Addresses, CartItem, Product, Order, OrderItem
from schemas.addresses import AddressCreate, AddressUpdate
from utils.responses import ResponseHandler
from sqlalchemy.orm import joinedload
from core.security import get_current_user, check_auth


class AddressService:
    # Get All Addresses
    @staticmethod
    def get_all_addresses(token, db: Session, page: int, limit: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        addresses = db.query(Addresses).filter(Addresses.user_id == user_id).offset((page - 1) * limit).limit(limit).all()
        message = f"Page {page} with {limit} addresses"
        return ResponseHandler.success(message, addresses)

    # Get A Addresse By ID
    @staticmethod
    def get_address(token, db: Session):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        address = db.query(Addresses).filter(Addresses.user_id == user_id).first()
        if not address:
            ResponseHandler.not_found_error("Address", user_id)
        return ResponseHandler.get_single_success("cart", user_id)

    # Create a new Cart
    @staticmethod
    def create_address(token, db: Session, address: AddressCreate):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        address_dict = address.model_dump()
        order = db.query(Order).filter(Order.user_id == user_id, Order.completed == False).first()
        address_dict['order_id'] = order.id
        address_dict['user_id'] = user_id
        address_db = Addresses(**address_dict)
        db.add(address_db)
        db.commit()
        db.refresh(address_db)
        return ResponseHandler.create_success("Address", address_db.id, address_db)