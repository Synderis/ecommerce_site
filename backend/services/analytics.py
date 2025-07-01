from sqlalchemy.orm import Session
from sqlalchemy import text
from utils.responses import ResponseHandler
from core.security import get_current_user, check_auth
from schemas.analytics import Query
from models.models import Product
from fastapi import HTTPException, status


class QueryService:
    # Get Query
    @staticmethod
    # def get_query(db: Session, query_name: str):
    def get_query(token, db: Session, query_name: str):
        if not check_auth(token.credentials):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Auth failed"
            )
        try:
            stored_procedure_dict = {
                "Product Launch Sales": "select * from fn_product_order_intervals()",
                "Cart vs Order Revenue": "select * from fn_cart_vs_order_revenue_summary()",
                "Top 5 Products by Season": "select * from fn_top5_products_by_season()",
                "Units and Revenue by Region and Brand": "select * from fn_units_and_revenue_by_region_brand()",
                "Quarterly FYTD Revenue": "select * from fn_quarterly_fytd_revenue()",
                "Shipping Delays": "select * from fn_order_shipping_time_and_item_counts()",
                "Time Between Orders": "select * from fn_user_order_intervals()"
            }
            if query_name not in stored_procedure_dict:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Query not found"
                )
            query_text = stored_procedure_dict[query_name]
            result = db.execute(text(query_text))
            rows = result.fetchall()
            headers = result.keys()
            return [
                dict(zip(headers, row))
                for row in rows
            ]
        except Exception as e:
            print(f"Error in query execution: {e}", flush=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Query execution failed"
            )
