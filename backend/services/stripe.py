from sqlalchemy.orm import Session
from models.models import Product, Category, Order, Addresses, OrderItem
from schemas.products import ProductCreate, ProductUpdate
from utils.responses import ResponseHandler
from core.security import get_current_user, check_auth
from datetime import datetime
import stripe
from fastapi import status
from core.config import settings


stripe_secret_key = settings.stripe_secret_key
if stripe_secret_key is None:
    raise ValueError("STRIPE_SECRET_KEY environment variable is not set")
stripe.api_key = stripe_secret_key

class StripeService:
    @staticmethod
    async def validate_items(token, db: Session, order_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        order = db.query(Order).filter(Order.id == order_id).first()
        for item in order.order_items:
            current_product = db.query(Product).filter(Product.id == item.product_id).first()
            if current_product.stock != 1 or current_product.is_published != True:
                for order_item in order.order_items:
                    db.delete(order_item)
                db.delete(order)
                db.commit()
                return ResponseHandler.not_found_error("Order", order_id)
    
    @staticmethod
    async def process_payment(token, db: Session, order_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user = get_current_user(token)
        order = db.query(Order).filter(Order.id == order_id).first()
        
        try:
            checkout_session = stripe.checkout.Session.create(
                customer_email='toccidylan@gmail.com',
                currency='usd',
                submit_type='auto',
                billing_address_collection='auto',
                shipping_address_collection={
                    'allowed_countries': ['US', 'CA'],
                },
                line_items = [
                    {
                        "price_data": {
                            "currency": "usd",
                            "product_data": {
                                "name": item.product_id,
                            },
                            "unit_amount": item.subtotal,
                        },
                        "quantity": 1,
                    }
                    for item in order.order_items
                ],
                mode='payment',
                success_url=f'https://supercrazychick.com/success=true/{order.id}',
                # cancel_url=YOUR_DOMAIN + '?canceled=true',
                automatic_tax={'enabled': True},
            )
        except Exception as e:
            return str(e)
        checkout_id = checkout_session.id
        order.payment_id = checkout_id
        db.commit()
        db.refresh(order)
        return ResponseHandler.perm_success2(checkout_session.url, checkout_id)

    @staticmethod
    async def confirm_payment(token, db: Session, order_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        # user = get_current_user(token.credentials)
        order = db.query(Order).filter(Order.id == order_id).first()
        if order.completed_at:
            return ResponseHandler.not_found_error("Order", order)
        try:
            if stripe.checkout.Session.retrieve(order.payment_id).payment_status == 'paid':
                payment_items = stripe.checkout.Session.list_line_items(order.payment_id)
                shipping_data = stripe.checkout.Session.retrieve(order.payment_id)
        except Exception as e:
            return ResponseHandler.not_found_error("Order", e)
        
        address_db = Addresses(order_id=order.id,
                user_id=order.user_id,
                full_name=shipping_data.shipping_details.name,
                street_address=shipping_data.shipping_details.address.line1,
                street_address_sub=shipping_data.shipping_details.address.line2,
                city=shipping_data.shipping_details.address.city,
                state=shipping_data.shipping_details.address.state,
                country=shipping_data.shipping_details.address.country,
                zip_code=shipping_data.shipping_details.address.postal_code,
                address_type="shipping")
        db.add(address_db)
        
        for item in order.order_items:
            for i in payment_items.data:
                if i.description == f"{item.product_id}":
                    tax_subtotal = i.amount_tax
                    current_order_item = db.query(OrderItem).filter_by(product_id=item.product_id, order_id=order.id).first()
                    current_order_item.tax_subtotal = tax_subtotal
                    current_product = db.query(Product).filter_by(id=item.product_id).first()
                    current_product.stock = 0
                    current_product.is_published = False
        db.commit()
        order.tax_total = 0
        for item in payment_items.data:
            order.tax_total += item.amount_tax
        if order.order_total == order.item_total and (order.shipping_total != 0 or order.shipping_total != 0):
            order.order_total += order.shipping_total
            order.order_total += order.tax_total
        order.completed_at = datetime.now()
        order.payment_type = shipping_data.get("payment_method_types")[0]
        order.payment_id = None
        db.commit()
        db.refresh(order)
        return ResponseHandler.success("Order", order)