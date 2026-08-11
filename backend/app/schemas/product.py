from uuid import UUID

from pydantic import BaseModel


class ProductResponse(BaseModel):
    id: UUID
    name: str
    sku: str
    description: str | None = None
    unit: str
    is_available: bool
    category_id: UUID