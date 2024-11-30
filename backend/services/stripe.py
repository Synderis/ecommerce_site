from sqlalchemy.orm import Session
from models.models import Product, Category, Order, Addresses
from schemas.products import ProductCreate, ProductUpdate
from utils.responses import ResponseHandler
from core.security import get_current_user, check_auth
from datetime import datetime
import stripe
from fastapi import status
import os
from dotenv import load_dotenv

load_dotenv()

stripe_secret_key = os.environ.get("STRIPE_SECRET_KEY")
if stripe_secret_key is None:
    raise ValueError("STRIPE_SECRET_KEY environment variable is not set")
stripe.api_key = stripe_secret_key

class StripeService:
    @staticmethod
    async def process_payment(token, db: Session, order_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user = get_current_user(token)
        order = db.query(Order).filter(Order.id == order_id, Order.completed == False).first()
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
                success_url=f'https://synderispricechecker.com/?success=true/{order.id}',
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
        user = get_current_user(token)
        order = db.query(Order).filter(Order.id == order_id).first()
        payment_data = stripe.checkout.Session.list_line_items(order.payment_id)
        payment_items = payment_data.data
        Addresses(order_id=order.id,
                user_id=user.id,
                full_name=payment_data.shipping_details.name,
                street_address=payment_data.shipping_details.address.line1,
                city=payment_data.shipping_details.address.city,
                state=payment_data.shipping_details.address.state,
                zip=payment_data.shipping_details.address.postal_code,
                address_type="shipping").save(db)
        order.completed = True
        order.completed_at = datetime.now()
        for item in order.order_items:
            for i in payment_items.data:
                if i.description == f"{item.product_id}":
                    item.tax_subtotal = payment_items.data
        for item in payment_items.data:
            order.tax_total += item.amount_tax
        order.payment_type = payment_data.get("payment_method_types")[0]
        order.payment_id = None
        db.commit()
        db.refresh(order)
        return ResponseHandler.success("Order", order)