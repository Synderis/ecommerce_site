from fastapi import APIRouter, Depends, Query, status, File, UploadFile
from fastapi.responses import FileResponse
# from fastapi.staticfiles import StaticFiles
from db.database import get_db
from services.products import ProductService
from sqlalchemy.orm import Session
from schemas.products import ProductCreate, ProductOut, ProductsOut, ProductOutDelete, ProductUpdate, ImageOut
from core.security import get_current_user, check_admin_role
import os
from fastapi.responses import JSONResponse
import logging
import base64
import re
import shutil
logger = logging.getLogger(__name__)


router = APIRouter(tags=["Products"], prefix="/products")


# Get All Listed Products
@router.get("/", status_code=status.HTTP_200_OK, response_model=ProductsOut)
def get_products(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    search: str | None = Query("", description="Search based title of products"),
):
    return ProductService.get_products(db, page, limit, search)

@router.get("/admin-products", status_code=status.HTTP_200_OK, response_model=ProductsOut, dependencies=[Depends(check_admin_role)])
def get_all_products(
    db: Session = Depends(get_db),
):
    return ProductService.get_all_products(db)


# Get Product By ID
@router.get("/{product_id}", status_code=status.HTTP_200_OK, response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    return ProductService.get_product(db, product_id)

# Get Image
@router.get("/assets/{image_name}")
def get_image(image_name: str):
    pass

from fastapi import Request

@router.post("/upload", status_code=status.HTTP_200_OK, dependencies=[Depends(check_admin_role)])
async def upload_image(
        request: Request,
        file: UploadFile,
):
    # print(request.headers)
    # print(request.body())
    try:
        contents = await file.read()
        file_path = f"./assets/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(contents)
        return {"message": "Image uploaded successfully"}
    except Exception as e:
        return {"message": str(e)}

# Create New Product
@router.post(
    "/create",
    status_code=status.HTTP_201_CREATED,
    response_model=ProductOut,
    dependencies=[Depends(check_admin_role)])
def create_product(
        product: ProductCreate,
        db: Session = Depends(get_db)):
    return ProductService.create_product(db, product)


# Update Exist Product
@router.put(
    "/{product_id}",
    status_code=status.HTTP_200_OK,
    response_model=ProductOut,
    dependencies=[Depends(check_admin_role)])
def update_product(
        product_id: int,
        updated_product: ProductUpdate,
        db: Session = Depends(get_db)):
    return ProductService.update_product(db, product_id, updated_product)


# Delete Product By ID
@router.put(
    "/{product_id}/deactivate",
    status_code=status.HTTP_200_OK,
    response_model=ProductOutDelete,
    dependencies=[Depends(check_admin_role)])
def deactivate_product(
        product_id: int,
        db: Session = Depends(get_db)):
    return ProductService.deactivate_product(db, product_id)

# Delete Product By ID
@router.delete(
    "/{product_id}",
    status_code=status.HTTP_200_OK,
    response_model=ProductOutDelete,
    dependencies=[Depends(check_admin_role)])
def delete_product(
        product_id: int,
        db: Session = Depends(get_db)):
    return ProductService.delete_product(db, product_id)