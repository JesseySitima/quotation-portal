from fastapi import APIRouter

from app.db.client import supabase


router = APIRouter(
    prefix="/api/v1/categories",
    tags=["Categories"],
)


@router.get("")
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