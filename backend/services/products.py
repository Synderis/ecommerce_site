from sqlalchemy.orm import Session
from models.models import Product, Category
from schemas.products import ProductCreate, ProductUpdate
from utils.responses import ResponseHandler
from fastapi.responses import JSONResponse
from datetime import datetime


class ProductService:
    @staticmethod
    def get_products(db: Session, page: int, limit: int, search: str = ""):
        products = db.query(Product).order_by(Product.id.asc()).filter(
            Product.stock > 0, Product.is_published == True).all()
        return {"message": f"Page {page} with {limit} products", "data": products}
    
    @staticmethod
    def get_all_products(db: Session):
        products = db.query(Product).order_by(Product.id.asc()).all()
        return {"message": f"Page with products", "data": products}

    @staticmethod
    def get_product(db: Session, product_id: int):
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            ResponseHandler.not_found_error("Product", product_id)
        return ResponseHandler.get_single_success(product.title, product_id, product)

    @staticmethod
    def create_product(db: Session, product: ProductCreate):
        product_exists = db.query(Product).filter(Product.title == product.title).first()
        if product_exists:
            ResponseHandler.not_found_error("Category", product.category_id)

        product_dict = product.model_dump()
        if not product_dict["created_at"]:
            product_dict["created_at"] = datetime.now()
        if product_dict["stock"] == 0:
            product_dict["stock"] = 1
        db_product = Product(**product_dict)
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return ResponseHandler.create_success(db_product.title, db_product.id, db_product)
    
    @staticmethod
    def upload_image(file):
        file_path = f"./assets/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(file.file.read())
        return JSONResponse(content={"message": "Image uploaded successfully"}, status_code=200)

    @staticmethod
    def update_product(db: Session, product_id: int, updated_product: ProductUpdate):
        db_product = db.query(Product).filter(Product.id == product_id).first()
        if not db_product:
            ResponseHandler.not_found_error("Product", product_id)

        for key, value in updated_product.model_dump().items():
            setattr(db_product, key, value)

        db.commit()
        db.refresh(db_product)
        return ResponseHandler.update_success(db_product.title, db_product.id, db_product)
    
    @staticmethod
    def deactivate_product(db: Session, product_id: int):
        db_product = db.query(Product).filter(Product.id == product_id).first()
        if not db_product:
            ResponseHandler.not_found_error("Product", product_id)
        db_product.is_published = False
        db.commit()
        db.refresh(db_product)
        return ResponseHandler.update_success(db_product.title, db_product.id, db_product)

    @staticmethod
    def delete_product(db: Session, product_id: int):
        db_product = db.query(Product).filter(Product.id == product_id).first()
        if not db_product:
            ResponseHandler.not_found_error("Product", product_id)
        db.delete(db_product)
        db.commit()
        return ResponseHandler.delete_success(db_product.title, db_product.id, db_product)