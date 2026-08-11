from fastapi import APIRouter

from app.db.client import supabase
from app.schemas.category import CategoryResponse

router = APIRouter(
    prefix="/api/v1/categories",
    tags=["Categories"],
)


@router.get("", response_model=list[CategoryResponse])
def get_categories():
    response = (
        supabase
        .table("categories")
        .select("id, name, slug, description")
        .eq("is_active", True)
        .order("name")
        .execute()
    )

    return response.data