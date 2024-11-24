from sqlalchemy.orm import Session
from models.models import Product, Category, Order, Addresses
from schemas.products import ProductCreate, ProductUpdate
from utils.responses import ResponseHandler
from fastapi.responses import JSONResponse
from core.security import get_current_user, check_auth
from datetime import datetime
from stripe import Stripe, PaymentIntent
from fastapi import status
import os

stripe_secret_key = os.environ.get("STRIPE_SECRET_KEY")
# stripe_secret_key = "STRIPE_SECRET_KEY"
stripe = Stripe(stripe_secret_key)

class StripeService:
    @staticmethod
    def process_payment(token, db: Session, amount: float, currency: str):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        current_user = get_current_user(token)
        order_id = 25
        order = db.query(Order).filter(Order.id == order_id, Order.completed == False).first()
        address = db.query(Addresses).filter(Addresses.order_id == order_id).first()
        try:
            payment_intent = stripe.PaymentIntent.create(
                amount=order.order_total * 100,
                currency=currency,
                payment_method_types=["card"],
                metadata={"token": token},
            )
        except Exception as e:
            return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})

        # Confirm the PaymentIntent
        try:
            payment_intent.confirm()
        except Exception as e:
            return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})

        # Charge the customer
        try:
            payment_intent.charges.data[0].capture()
        except Exception as e:
            return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": str(e)})
        
        order.completed = True
        db.commit()
        db.refresh(order)
        return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "Payment successful"})
    
    @staticmethod
    def calculate_tax(order, address):
        tax_calc = stripe.tax.Calculation.create(
            currency="usd",
            customer_details={
                "address": {
                "line1": address.street_address,
                "city": address.city,
                "state": address.state,
                "postal_code": address.zip,
                "country": "US",
                },
                "address_source": address.address_type,
            },
            line_items = [
                {
                    "amount": item["subtotal"] * 100,  # convert to cents
                    "reference": f"product_id_{item['product_id']}",  # replace with actual reference
                }
                for item in order.order_items
            ],
            shipping_cost={"amount": 300},
            expand=["line_items"],
        )
        tax_calc = tax_calc.to_dict()
        item_pointer = 0
        for item in order.order_items:
            item["tax_subtotal"] = tax_calc["line_items"]["data"][item_pointer]["tax_amount"]["tax"]
            item_pointer += 1
        return order