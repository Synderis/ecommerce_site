from sqlalchemy.orm import Session
from models.models import Cart, CartItem, Product
from schemas.carts import CartUpdate, CartCreate, CartItemCreate
from utils.responses import ResponseHandler
from sqlalchemy.orm import joinedload
from core.security import get_current_user, check_auth


class CartService:
    # Get All Carts
    @staticmethod
    def get_all_carts(token, db: Session, page: int, limit: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        carts = db.query(Cart).filter(Cart.user_id == user_id).offset((page - 1) * limit).limit(limit).all()
        message = f"Page {page} with {limit} carts"
        return ResponseHandler.success(message, carts)

    # Get A Cart By ID
    @staticmethod
    def get_cart(token, db: Session, cart_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        cart = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user_id).first()
        if not cart:
            ResponseHandler.not_found_error("Cart", cart_id)
        return ResponseHandler.get_single_success("cart", cart_id, cart)
    
    @staticmethod
    def get_active_cart(token, db: Session):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token).get('id')
        cart = db.query(Cart).filter(Cart.user_id == user_id, Cart.active == True).first()
        if not cart:
            ResponseHandler.not_found_error("Cart", Cart.id)
        return ResponseHandler.get_single_success("cart", Cart.id, cart)

    # Create a new Cart
    @staticmethod
    def create_cart(token, db: Session, cart: CartCreate):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        cart_dict = cart.model_dump()

        cart_items_data = cart_dict.pop("cart_items", [])
        cart_items = []
        total_amount = 0
        for item_data in cart_items_data:
            product_id = item_data['product_id']
            quantity = item_data['quantity']

            product = db.query(Product).filter(Product.id == product_id).first()
            if not product:
                return ResponseHandler.not_found_error("Product", product_id)
            if product.discount_percentage == 0:
                subtotal = quantity * product.price
            else:
                subtotal = quantity * product.price * (product.discount_percentage / 100)

            cart_item = CartItem(product_id=product_id, quantity=quantity, subtotal=subtotal)
            total_amount += subtotal

            cart_items.append(cart_item)
        cart_db = Cart(cart_items=cart_items, user_id=user_id, total_amount=total_amount, **cart_dict)
        db.add(cart_db)
        db.commit()
        db.refresh(cart_db)
        return ResponseHandler.create_success("Cart", cart_db.id, cart_db)


    @staticmethod
    def validate_cart_items(token, db: Session, cart_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        cart = db.query(Cart).filter(Cart.id == cart_id).first()
        for item in cart.cart_items:
            current_product = db.query(Product).filter(Product.id == item.product_id).first()
            if current_product.stock < 1 or current_product.is_published != True:
                product_name = current_product.title
                return ResponseHandler.not_available_error("Product", product_name)
        return ResponseHandler.success("All items are available", cart)
                

    @staticmethod
    def add_to_cart(token, db: Session, cart_id: int, cart_item: CartItemCreate):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        cart = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user_id).first()
        if not cart:
            return ResponseHandler.not_found_error("Cart", cart_id)
        existing_item = next((item for item in cart.cart_items if item.product_id == cart_item.product_id), None)
        if existing_item:
            existing_item.quantity = cart_item.quantity
        else:
            product = db.query(Product).filter(Product.id == cart_item.product_id).first()
            if not product:
                return ResponseHandler.not_found_error("Product", cart_item.product_id)
            subtotal = float(cart_item.quantity) * product.price
            cart_item = CartItem(cart_id=cart_id, product_id=cart_item.product_id, quantity=cart_item.quantity, subtotal=subtotal)
            db.add(cart_item)
            cart.cart_items.append(cart_item)
            cart.total_amount += subtotal
        db.commit()
        db.refresh(cart)
        return ResponseHandler.update_success("cart", cart.id, cart)

    # Update Cart & CartItem
    @staticmethod
    def update_cart(token, db: Session, cart_id: int, updated_cart: CartUpdate):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)

        cart = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user_id).first()
        if not cart:
            return ResponseHandler.not_found_error("Cart", cart_id)
        # cart_items = db.query(CartItem).filter(CartItem.cart_id == cart_id).all()

        # Delete existing cart_items
        db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
        cart.total_amount = 0

        for item in updated_cart.cart_items:
            product_id = item.product_id
            quantity = item.quantity

            product = db.query(Product).filter(Product.id == product_id).first()
            if not product:
                return ResponseHandler.not_found_error("Product", product_id)
            
            if product.discount_percentage == 0:
                subtotal = float(quantity) * product.price
            else:
                subtotal = float(quantity) * product.price * (product.discount_percentage / 100)

            cart_item = CartItem(
                cart_id=cart_id,
                product_id=product_id,
                quantity=quantity,
                subtotal=subtotal
            )
            db.add(cart_item)
            cart.total_amount += subtotal

        # cart.total_amount = sum(item.subtotal for item in cart.cart_items)

        db.commit()
        db.refresh(cart)
        return ResponseHandler.update_success("cart", cart.id, cart)


    @staticmethod
    def deactivate_cart(token, db: Session, cart_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        cart = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user_id).first()
        if not cart:
            ResponseHandler.not_found_error("Cart", cart_id)
        cart.active = False
        db.commit()
        db.refresh(cart)
        return ResponseHandler.update_success("Cart", cart_id, cart)

    # Delete Both Cart and CartItems
    @staticmethod
    def delete_cart(token, db: Session, cart_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        
        user_id = get_current_user(token)
        cart = (
            db.query(Cart)
            .options(joinedload(Cart.cart_items).joinedload(CartItem.product))
            .filter(Cart.id == cart_id, Cart.user_id == user_id)
            .first()
        )
        if not cart:
            ResponseHandler.not_found_error("Cart", cart_id)

        for cart_item in cart.cart_items:
            db.delete(cart_item)

        db.delete(cart)
        db.commit()
        return ResponseHandler.delete_success("Cart", cart_id, cart)