from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from datetime import datetime

from app.db.client import supabase
from app.schemas.quotation import QuotationRequestCreate
from app.services.email import send_quotation_email
from app.services.excel import create_quotation_excel
from app.services.word import create_quotation_word


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

    try:
        send_quotation_email(
            quotation,
            items_response.data,
        )
        email_sent = True

    except Exception as e:
        print(f"Quotation email failed: {e}")
        email_sent = False

    return {
        "message": "Quotation request created successfully",
        "quotation": quotation,
        "items": items_response.data,
        "email_sent": email_sent,
    }


@router.get("/{quotation_id}/excel")
def download_quotation_excel(quotation_id: str):
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

    excel_data = create_quotation_excel(
        quotation,
        items,
    )

    return Response(
        content=excel_data,
        media_type=(
            "application/vnd.openxmlformats-officedocument."
            "spreadsheetml.sheet"
        ),
        headers={
            "Content-Disposition": (
                f'attachment; filename="{quotation["request_number"]}.xlsx"'
            )
        },
    )


@router.get("/{quotation_id}/word")
def download_quotation_word(quotation_id: str):
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

    word_data = create_quotation_word(
        quotation,
        items,
    )

    return Response(
        content=word_data,
        media_type=(
            "application/vnd.openxmlformats-officedocument."
            "wordprocessingml.document"
        ),
        headers={
            "Content-Disposition": (
                f'attachment; filename="{quotation["request_number"]}.docx"'
            )
        },
    )