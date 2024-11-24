from fastapi import APIRouter, Depends, Query, status
from db.database import get_db
from services.carts import CartService
from services.addresses import AddressService
from services.stripe import StripeService
from sqlalchemy.orm import Session
from schemas.carts import CartCreate, CartUpdate, CartOut, CartOutDelete, CartsOutList, CartItemCreate
from schemas.addresses import AddressCreate, AddressUpdate, AddressesOut, AddressOut
from core.security import get_current_user
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
from fastapi.responses import JSONResponse
# from stripe import Stripe, PaymentIntent
# import os

router = APIRouter(tags=["Stripe"], prefix="/stripe")
auth_scheme = HTTPBearer()

# stripe_secret_key = os.environ.get("STRIPE_SECRET_KEY")
# # stripe_secret_key = "STRIPE_SECRET_KEY"
# stripe = Stripe(stripe_secret_key)


@router.post("/process-payment/")
async def process_payment(amount: float, currency: str, token: str, db: Session = Depends(get_db),
                        current_user: HTTPAuthorizationCredentials = Depends(get_current_user)):
    return await StripeService.process_payment(token, db, amount, currency)