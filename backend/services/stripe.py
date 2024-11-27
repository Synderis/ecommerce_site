from sqlalchemy.orm import Session
from models.models import Product, Category, Order, Addresses
from schemas.products import ProductCreate, ProductUpdate
from utils.responses import ResponseHandler
from core.security import get_current_user, check_auth
from datetime import datetime
# from stripe import Stripe, PaymentIntent
import stripe
from fastapi import status
import os
from dotenv import load_dotenv

load_dotenv()

# stripe_secret_key = os.environ.get("STRIPE_SECRET_KEY")
# print(stripe_secret_key)
# # stripe_secret_key = "STRIPE_SECRET_KEY"
# stripe.api_key = stripe_secret_key
stripe_secret_key = os.environ.get("STRIPE_SECRET_KEY")
if stripe_secret_key is None:
    raise ValueError("STRIPE_SECRET_KEY environment variable is not set")
stripe.api_key = stripe_secret_key

class StripeService:
    # @staticmethod
    # async def process_payment(token, db: Session, order_id: int):
    #     if not check_auth(token.credentials):
    #         return ResponseHandler.blacklisted_token(token, 'Auth failed')
    #     order = db.query(Order).filter(Order.id == order_id, Order.completed == False).first()
    #     address = db.query(Addresses).filter(Addresses.order_id == order_id, Addresses.address_type == "billing").first()
    #     updated_order = await StripeService.calculate_tax(db, order, address)
    #     try:
    #         payment_intent = stripe.PaymentIntent.create(
    #             amount=updated_order.order_total,
    #             currency="usd",
    #             customer="cus_RHGNSyj6v50QT8",
    #             payment_method_types=["card"],
    #             metadata={"token": token},
    #         )
    #     except Exception as e:
    #         return ResponseHandler.payment_failure(message="Create", error=str(e))

    #     # Confirm the PaymentIntent
    #     try:
    #         payment_intent.confirm(
    #             payment_method="pm_1QOxzqDeMPHtfstrRwU4aj4c",
    #         )
    #     except Exception as e:
    #         return ResponseHandler.payment_failure(message="Confirm", error=str(e))
        
    #     if payment_intent.get("status") == "succeeded":
    #         order.completed = True
    #         order.payment_type = payment_intent.get("payment_method_types")[0]
    #         db.commit()
    #         db.refresh(updated_order)
    #         message = f"Payment successful for order {updated_order.id}"
    #         print(message)
    #         return ResponseHandler.success(message, updated_order)
    #     else:
    #         print('failed but not sure why')
    #         return ResponseHandler.payment_failure("Confirm", "status is not success")
    
    @staticmethod
    async def process_payment(token, db: Session, order_id: int):
        if not check_auth(token.credentials):
            return ResponseHandler.blacklisted_token(token, 'Auth failed')
        user = get_current_user(token)
        order = db.query(Order).filter(Order.id == order_id, Order.completed == False).first()
        address = db.query(Addresses).filter(Addresses.order_id == order_id, Addresses.address_type == "billing").first()
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
                        # "reference": f"product_id_{item.product_id}",
                        "quantity": 1,
                    }
                    for item in order.order_items
                ],
                # receipt_email='toccidylan@gmail.com',
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
        print(checkout_session.url)

        return ResponseHandler.perm_success2(checkout_session.url, checkout_id)
    
    @staticmethod
    async def calculate_tax(db: Session, order, address):
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
                    "amount": item.subtotal,  # convert to cents
                    "reference": f"product_id_{item.product_id}",  # replace with actual reference
                }
                for item in order.order_items
            ],
            shipping_cost={"amount": 300},
            expand=["line_items"],
        )
        try:
            item_pointer = 0
            for item in order.order_items:
                if item.tax_subtotal != tax_calc["line_items"]["data"][item_pointer]["amount_tax"]:
                    item.tax_subtotal = tax_calc["line_items"]["data"][item_pointer]["amount_tax"]
                item_pointer += 1
            print(tax_calc)
            calc_tax_total = sum(item.tax_subtotal for item in order.order_items)
            calc_tax_total += tax_calc['shipping_cost']['amount_tax']
            if calc_tax_total != tax_calc['tax_amount_exclusive']:
                order.tax_total = tax_calc['tax_amount_exclusive']
                print(order.tax_total, tax_calc['tax_amount_exclusive'])
                raise Exception("Tax calculation mismatch")
            if order.shipping_total != tax_calc['shipping_cost']['amount']:
                order.shipping_total = tax_calc['shipping_cost']['amount']
            if order.order_total != tax_calc['tax_amount_exclusive'] + order.shipping_total + order.item_total:
                order.order_total = tax_calc['tax_amount_exclusive'] + order.shipping_total + order.item_total
            if order.tax_total != calc_tax_total:
                order.tax_total = calc_tax_total
            db.commit()
            db.refresh(order)
            return order
        except Exception as e:
            print(e, tax_calc)
            
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
        # checkout_data = stripe.checkout.Session.retrieve(session_id)
        # checkout_data.shipping_details