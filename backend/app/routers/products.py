from fastapi import APIRouter

from app.db.client import supabase


router = APIRouter(
    prefix="/api/v1/products",
    tags=["Products"],
)

@router.get("")
def get_products():
    response = (
        supabase
        .table("products")
        .select(
            "id, name, sku, description, unit, "
            "stock_quantity, is_available, category_id"
        )
        .eq("is_available", True)
        .order("name")
        .execute()
    )

    return response.data