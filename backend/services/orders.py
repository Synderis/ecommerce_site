from sqlalchemy.orm import Session
from models.models import Cart, CartItem, Product, Order
from utils.responses import ResponseHandler
from datetime import datetime
from core.security import get_current_user
import json


class OrderService:
    # Get All Orders
    @staticmethod
    def get_all_orders(token, db: Session, page: int, limit: int):
        user_id = get_current_user(token)
        orders = db.query(Order).filter(Order.user_id == user_id).offset((page - 1) * limit).limit(limit).all()
        message = f"Page {page} with {limit} orders"
        return ResponseHandler.success(message, orders)

    # Get A Order By ID
    @staticmethod
    def get_order(token, db: Session, order_id: int):
        user_id = get_current_user(token)
        order = db.query(Order).filter(Order.id == order_id, Order.user_id == user_id).first()
        if not order:
            ResponseHandler.not_found_error("Order", order)
        return ResponseHandler.get_single_success("order", order_id, order)

    # Create a new Order
    @staticmethod
    def create_order(token, db: Session, cart_id: int):
        user_id = get_current_user(token)
        cart = db.query(Cart).filter(Cart.id == cart_id, Cart.user_id == user_id).first()
        if not cart:
            return ResponseHandler.not_found_error("Cart", cart_id)
        cart_id = cart_id
        item_total = cart.total_amount

        order_db = Order(id=None,
                        cart_id=cart_id,
                        item_total=item_total,
                        user_id=user_id,
                        order_timestamp=datetime.now(),
                        tax_total=0,
                        shipping_total=0,
                        order_total=item_total,
                        payment_type="NA",
                        completed=False,
                        shipped=False)

        db.add(order_db)
        db.commit()
        db.refresh(order_db)
        return ResponseHandler.create_success("Order", order_db.id, order_db)


    # Delete Order
    @staticmethod
    def delete_order(token, db: Session, order_id: int):
        user_id = get_current_user(token)
        order = (
            db.query(Order)
            .filter(Order.id == order_id, Order.user_id == user_id)
            .first()
        )
        if not order:
            ResponseHandler.not_found_error("Order", order_id)

        db.delete(order)
        db.commit()
        return ResponseHandler.delete_success("Order", order_id, order)