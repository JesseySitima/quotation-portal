from uuid import UUID

from fastapi import APIRouter, Query

from app.schemas.category import CategoryListResponse, CategoryResponse
from app.services.category import (
get_categories_service,
get_category_service,
)


from app.db.client import supabase
from app.schemas.category import CategoryListResponse, CategoryResponse


router = APIRouter(
    prefix="/api/v1/categories",
    tags=["Categories"],
)

@router.get("", response_model=CategoryListResponse)
def get_categories(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    ):
    return get_categories_service(
    page,
    page_size,
    )

@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: UUID):
    return get_category_service(category_id)