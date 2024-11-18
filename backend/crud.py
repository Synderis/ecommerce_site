from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .models import models

from .db import database
from . import schemas
import stripe

stripe.api_key = "your-stripe-secret-key"

router = APIRouter()

@router.post("/create-checkout-session/")
def create_checkout_session(product_id: int, db: Session = Depends(database.get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": product.currency,
                "product_data": {"name": product.name},
                "unit_amount": int(product.price * 100),
            },
            "quantity": 1,
        }],
        mode="payment",
        success_url="http://localhost:3000/success",
        cancel_url="http://localhost:3000/cancel",
    )
    return {"checkout_url": session.url}
