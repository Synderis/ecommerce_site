from sqlalchemy.orm import Session
from sqlalchemy import desc
from models.models import Cart, CartItem, Product, Order, OrderItem
from schemas.orders import OrderOut
from utils.responses import ResponseHandler
from datetime import datetime
from core.security import get_current_user, check_auth
import json


class OrderService:
    # Get All Orders ADMIN
    @staticmethod
    def get_all_orders(token, db: Session):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        orders = db.query(Order).all()
        message = f"Page with orders"
        return ResponseHandler.success(message, orders)

    # Get A Order By ID
    @staticmethod
    def get_order(token, db: Session, order_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        order = db.query(Order).filter(Order.id == order_id, Order.user_id == user_id).first()
        if not order:
            ResponseHandler.not_found_error("Order", order)
        return ResponseHandler.get_single_success("order", order_id, order)
    
    @staticmethod
    def get_order_items(token, db: Session, order_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        order = db.query(Order).filter(Order.id == order_id, Order.user_id == user_id).first()
        order_items = order.order_items
        if not order_items:
            ResponseHandler.not_found_error("Order", order_items)
        return ResponseHandler.success("order", order_items)
    
    @staticmethod
    def get_current_order(token, db: Session):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        current_user_id = get_current_user(token)
        order = db.query(Order).filter(Order.user_id == current_user_id, Order.completed == False).order_by(desc(Order.id)).first()
        if not order:
            ResponseHandler.not_found_error("Order", order)
        message = f"Current order"
        return ResponseHandler.get_single_success(message, order.id, order)
    
    # Get Order By User ID
    @staticmethod
    def get_user_orders(token, db: Session):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        # orders = db.query(Order).filter(Order.user_id == user_id, Order.completed == True).all()
        orders = db.query(Order).filter(Order.user_id == user_id).all()
        message = f"Page with  orders"
        if not orders:
            ResponseHandler.not_found_error("Order", orders)
        return ResponseHandler.success(message, orders)
    
    @staticmethod
    def update_order(token, db: Session, order_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        order = db.query(Order).filter(Order.id == order_id, Order.user_id == user_id).first()
        if not order:
            return ResponseHandler.not_found_error("Order", order_id)
        order.shipped_at = datetime.now()
        db.commit()
        db.refresh(order)
        return ResponseHandler.update_success("Order", order_id, order)

    # Create a new Order
    @staticmethod
    def create_order(token, db: Session, cart_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user_id = get_current_user(token)
        cart = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user_id).first()
        cart_items = cart.cart_items
        if not cart:
            return ResponseHandler.not_found_error("Cart", cart_id)
        cart_id = cart_id
        
        order_items = []
        
        for item in cart_items:
            current_product = db.query(Product).filter(Product.id == item.product_id).first()
            if current_product.stock == 1 and current_product.is_published == True:
                order_item = OrderItem(product_id=item.product_id, quantity=item.quantity, subtotal=item.subtotal)
                order_items.append(order_item)
            else:
                cart.total_amount -= item.subtotal
                db.delete(item)
                db.commit()

        item_total = cart.total_amount

        order_db = Order(id=None,
                        item_total=item_total,
                        user_id=user_id,
                        created_at=datetime.now(),
                        tax_total=0,
                        shipping_total=0,
                        order_total=item_total,
                        payment_type="N/A",
                        order_items=order_items,
                        completed_at=None,
                        shipped_at=None
                        )

        db.add(order_db)
        db.commit()
        db.refresh(order_db)
        
        for item in cart_items:
            db.delete(item)
        print('cart_items deleted')
        db.delete(cart)
        db.commit()
        print('cart deleted')
        return ResponseHandler.create_success("Order", order_db.id, order_db)


    # Delete Order
    # @staticmethod
    # def delete_order(token, db: Session, order_id: int):
    #     if not check_auth(token.credentials):
    #         return ResponseHandler.blacklisted_token(token, 'Auth failed')
    #     user_id = get_current_user(token)
    #     order = (
    #         db.query(Order)
    #         .filter(Order.id == order_id, Order.user_id == user_id)
    #         .first()
    #     )
    #     if not order:
    #         ResponseHandler.not_found_error("Order", order_id)

    #     db.delete(order)
    #     db.commit()
    #     return ResponseHandler.delete_success("Order", order_id, order)
    
    # @staticmethod
    # def get_finished_order(token, db: Session):
    #     if not check_auth(token.credentials):
    #         return ResponseHandler.blacklisted_token(token, 'Auth failed')
    #     user_id = get_current_user(token)
    #     orders = db.query(Order).filter(Order.completed == True, Order.user_id == user_id).order_by(desc(Order.id)).first()
    #     message = f"Page with  orders"
    #     print(type(orders))
    #     if not orders:
    #         ResponseHandler.not_found_error("Order", orders)
    #     return ResponseHandler.success(message, orders)