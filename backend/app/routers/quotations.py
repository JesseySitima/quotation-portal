from fastapi import APIRouter
from app.schemas.quotation import QuotationRequestCreate

router = APIRouter(
    prefix="/api/v1/quotations",
    tags=["Quotations"],
)

@router.post("")
def create_quotation(request: QuotationRequestCreate):
    return {
        "message": "Quotation request received",
        "facility_name": request.facility_name,
        "contact_person": request.contact_person,
        "email": request.email,
        "phone": request.phone,
        "items": request.items,
    }