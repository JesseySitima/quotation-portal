from uuid import UUID

from fastapi import APIRouter, HTTPException, Query

from app.schemas.product import ProductListResponse, ProductResponse
from app.services.product import (
get_products_service,
get_product_service,
)


router = APIRouter(
    prefix="/api/v1/products",
    tags=["Products"],
)

@router.get("", response_model=ProductListResponse)
def get_products(
    search: str | None = Query(
    default=None,
    min_length=1,
    max_length=100,
    ),
    category_id: UUID | None = None,
    page: int = Query(
    default=1,
    ge=1,
    ),
    page_size: int = Query(
    default=20,
    ge=1,
    le=100,
    ),
    ):
    return get_products_service(
    search,
    category_id,
    page,
    page_size,
    )
    
@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: UUID):
    product = get_product_service(product_id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )

    return product