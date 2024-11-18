from sqlalchemy.orm import Session
from models.models import Addresses, CartItem, Product
from schemas.addresses import AddressCreate, AddressUpdate
from utils.responses import ResponseHandler
from sqlalchemy.orm import joinedload
from core.security import get_current_user


class AddressService:
    # Get All Addresses
    @staticmethod
    def get_all_addresses(token, db: Session, page: int, limit: int):
        user_id = get_current_user(token)
        addresses = db.query(Addresses).filter(Addresses.user_id == user_id).offset((page - 1) * limit).limit(limit).all()
        message = f"Page {page} with {limit} addresses"
        return ResponseHandler.success(message, addresses)

    # Get A Addresse By ID
    @staticmethod
    def get_address(token, db: Session):
        user_id = get_current_user(token)
        address = db.query(Addresses).filter(Addresses.user_id == user_id).first()
        if not address:
            ResponseHandler.not_found_error("Address", user_id)
        return ResponseHandler.get_single_success("cart", user_id)

    # Create a new Cart
    @staticmethod
    def create_address(token, db: Session, address: AddressCreate):
        user_id = get_current_user(token)
        address_dict = address.model_dump()

        # cart_items_data = cart_dict.pop("cart_items", [])
        # cart_items = []
        # total_amount = 0
        # for item_data in cart_items_data:
        #     product_id = item_data['product_id']
        #     quantity = item_data['quantity']

        #     product = db.query(Product).filter(Product.id == product_id).first()
        #     if not product:
        #         return ResponseHandler.not_found_error("Product", product_id)
        #     if product.discount_percentage == 0:
        #         subtotal = quantity * product.price
        #     else:
        #         subtotal = quantity * product.price * (product.discount_percentage / 100)

        #     cart_item = CartItem(product_id=product_id, quantity=quantity, subtotal=subtotal)
        #     total_amount += subtotal

        #     cart_items.append(cart_item)
        address_db = Addresses(user_id=user_id, **address_dict)
        # cart_db = Cart(cart_items=cart_items, user_id=user_id, total_amount=total_amount, **cart_dict)
        db.add(address_db)
        db.commit()
        db.refresh(address_db)
        return ResponseHandler.create_success("Cart",   address_db.id, address_db)


    # Delete Both Cart and CartItems
    # @staticmethod
    # def delete_cart(token, db: Session, cart_id: int):
    #     user_id = get_current_user(token)
    #     cart = (
    #         db.query(Cart)
    #         .options(joinedload(Cart.cart_items).joinedload(CartItem.product))
    #         .filter(Cart.id == cart_id, Cart.user_id == user_id)
    #         .first()
    #     )
    #     if not cart:
    #         ResponseHandler.not_found_error("Cart", cart_id)

    #     for cart_item in cart.cart_items:
    #         db.delete(cart_item)

    #     db.delete(cart)
    #     db.commit()
    #     return ResponseHandler.delete_success("Cart", cart_id, cart)