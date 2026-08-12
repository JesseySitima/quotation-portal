import math
from uuid import UUID

from fastapi import HTTPException

from app.db.client import supabase

def get_categories_service(page: int, page_size: int):
    start = (page - 1) * page_size
    end = start + page_size - 1

    response = (
        supabase
        .table("categories")
        .select(
            "id, name, slug, description",
            count="exact",
        )
        .eq("is_active", True)
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

def get_category_service(category_id: UUID):
    response = (
    supabase
    .table("categories")
    .select("id, name, slug, description")
    .eq("id", str(category_id))
    .eq("is_active", True)
    .execute()
    )

    if not response.data:
        raise HTTPException(
            status_code=404,
            detail="Category not found",
        )

    return response.data[0]