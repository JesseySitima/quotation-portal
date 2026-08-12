from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.db.client import supabase
from app.schemas.quotation import QuotationRequestCreate
from app.services.email import send_quotation_email
from app.services.excel import create_quotation_excel
from app.services.word import create_quotation_word

from app.services.quotation import (
create_quotation_service,
get_quotation_with_items_service,
)


router = APIRouter(
    prefix="/api/v1/quotations",
    tags=["Quotations"],
)



@router.post("")
def create_quotation(request: QuotationRequestCreate):

    quotation, items = create_quotation_service(request)

    try:
        send_quotation_email(
            quotation,
            items,
        )

        email_sent = True

    except Exception as e:
        print(f"Quotation email failed: {e}")
        email_sent = False

    return {
        "message": "Quotation request created successfully",
        "quotation": quotation,
        "items": items,
        "email_sent": email_sent,
    }



@router.get("/{quotation_id}/excel")
def download_quotation_excel(quotation_id: str):

    quotation, items = get_quotation_with_items_service(
        quotation_id
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

    quotation, items = get_quotation_with_items_service(
        quotation_id
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