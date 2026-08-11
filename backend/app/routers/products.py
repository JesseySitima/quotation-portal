from fastapi import APIRouter, Query, HTTPException
from uuid import UUID
import math
from app.db.client import supabase
from app.schemas.product import ProductListResponse
from app.schemas.product import ProductResponse

router = APIRouter(
    prefix="/api/v1/products",
    tags=["Products"],
)

@router.get("", response_model=ProductListResponse)
def get_products(
    search: str | None = Query(default=None, min_length=1, max_length=100),
    category_id: UUID | None = None,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
):
    start = (page - 1) * page_size
    end = start + page_size - 1
    
    query = (
        supabase
        .table("products")
       .select(
            "id, name, sku, description, unit, "
            "stock_quantity, is_available, category_id",
            count="exact",
        )
        .eq("is_available", True)
    )

    if search:
        query = query.or_(
            f"name.ilike.%{search}%,sku.ilike.%{search}%"
        )
        
    if category_id:
        query = query.eq("category_id", str(category_id))

    response = (
        query
        .order("name")
        .range(start, end)
        .execute()
    )
    
    total = response.count or 0
    total_pages = math.ceil(total / page_size) if total > 0 else 0

    return {
    "items": response.data,
    "page": page,
    "page_size": page_size,
    "total": total,
    "total_pages": total_pages,
}
    
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: UUID):
    response = (
        supabase
        .table("products")
        .select(
            "id, name, sku, description, unit, "
            "stock_quantity, is_available, category_id"
        )
        .eq("id", str(product_id))
        .eq("is_available", True)
        .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return response.data[0]