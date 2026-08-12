import math
from uuid import UUID

from app.db.client import supabase

def get_products_service(
    search: str | None,
    category_id: UUID | None,
    page: int,
    page_size: int,
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
    
def get_product_service(product_id: UUID):
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
        return None

    return response.data[0]