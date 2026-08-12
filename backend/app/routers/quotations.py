from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.db.client import supabase
from app.schemas.quotation import QuotationRequestCreate
from app.services.email import send_quotation_email

router = APIRouter(
    prefix="/api/v1/quotations",
    tags=["Quotations"],
)


@router.post("")
def create_quotation(request: QuotationRequestCreate):
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
        
    send_quotation_email(
        quotation,
        items_response.data,
    )

    return {
        "message": "Quotation request created successfully",
        "quotation": quotation,
        "items": items_response.data,
    }
    
