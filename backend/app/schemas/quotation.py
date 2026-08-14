from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class QuotationRequestItemCreate(BaseModel):
    product_id: UUID
    quantity: int = Field(gt=0)


class QuotationRequestCreate(BaseModel):
    facility_name: str = Field(min_length=2, max_length=200)
    contact_person: str = Field(min_length=2, max_length=200)
    email: EmailStr | None = None
    phone: str = Field(min_length=5, max_length=50)
    notes: str | None = Field(default=None, max_length=2000)

    items: list[QuotationRequestItemCreate] = Field(min_length=1)


class QuotationRequestItemResponse(BaseModel):
    product_id: UUID
    product_name: str
    quantity: int
    unit: str


class QuotationRequestResponse(BaseModel):
    id: UUID
    request_number: str
    facility_name: str
    contact_person: str
    email: EmailStr | None = None
    phone: str
    notes: str | None = None
    status: str
    created_at: str
    items: list[QuotationRequestItemResponse]