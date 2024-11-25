from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
# from backend import crud, stripe_webhook
from routers import products, carts, users, accounts, auth, orders, addresses, stripe
from core.security import get_user_token


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def startup_event():
    token = await get_user_token(id=1)
    print(token)

app.add_event_handler("startup", startup_event)
app.mount("/assets", StaticFiles(directory="./assets"), name="assets")

# Include Stripe webhook and CRUD routes
# app.include_router(crud.router)
# app.include_router(stripe_webhook.router)
app.include_router(stripe.router)
app.include_router(addresses.router)
app.include_router(products.router)
app.include_router(carts.router)
app.include_router(orders.router)
app.include_router(users.router)
app.include_router(accounts.router)
app.include_router(auth.router)