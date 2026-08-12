
from datetime import datetime

from fastapi import HTTPException

from app.db.client import supabase
from app.schemas.quotation import QuotationRequestCreate


def create_quotation_service(request: QuotationRequestCreate):
    quotation_response = (
        supabase
        .table("quotation_requests")
        .insert({
            "request_number": f"QT-{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "facility_name": request.facility_name,
            "contact_person": request.contact_person,
            "email": request.email,
            "phone": request.phone,
            "notes": request.notes,
            "status": "PENDING",
        })
        .execute()
    )

    if not quotation_response.data:
        raise HTTPException(
            status_code=500,
            detail="Failed to create quotation request",
        )

    quotation = quotation_response.data[0]
    quotation_id = quotation["id"]

    items = []

    for item in request.items:
        product_response = (
            supabase
            .table("products")
            .select("id, name, unit")
            .eq("id", str(item.product_id))
            .single()
            .execute()
        )

        product = product_response.data

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found",
            )

        items.append({
            "quotation_request_id": quotation_id,
            "product_id": product["id"],
            "product_name": product["name"],
            "quantity": item.quantity,
            "unit": product["unit"],
        })

    items_response = (
        supabase
        .table("quotation_request_items")
        .insert(items)
        .execute()
    )

    if not items_response.data:
        raise HTTPException(
            status_code=500,
            detail="Failed to create quotation items",
        )

    return quotation, items_response.data

def get_quotation_with_items_service(quotation_id: str):
    quotation_response = (
    supabase
    .table("quotation_requests")
    .select("*")
    .eq("id", quotation_id)
    .single()
    .execute()
    )

    quotation = quotation_response.data

    if not quotation:
        raise HTTPException(
            status_code=404,
            detail="Quotation request not found",
        )

    items_response = (
        supabase
        .table("quotation_request_items")
        .select(
            "id, quotation_request_id, product_id, product_name, quantity, unit"
        )
        .eq("quotation_request_id", quotation_id)
        .execute()
    )

    items = items_response.data

    if not items:
        raise HTTPException(
            status_code=404,
            detail="No quotation items found",
        )

    return quotation, items