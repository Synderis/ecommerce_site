from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from services.analytics import QueryService
from typing import List
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials

from db.database import get_db
from schemas.analytics import Query

router = APIRouter(tags=["Query"], prefix="/query")
auth_scheme = HTTPBearer()

@router.get("/{query_name}", status_code=status.HTTP_200_OK, response_model=List[Query])
def get_query(
    query_name: str,
    db: Session = Depends(get_db),
    token: HTTPAuthorizationCredentials = Depends(auth_scheme)
):
    return QueryService.get_query(token, db, query_name)
    # return QueryService.get_query(db, query_name)