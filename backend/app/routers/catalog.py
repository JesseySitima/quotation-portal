from fastapi import APIRouter, File, UploadFile

from app.services.catalog import upload_catalog_service


router = APIRouter(
    prefix="/api/v1/catalog",
    tags=["Catalog"],
)


@router.post("/upload")
def upload_catalog(
    file: UploadFile = File(...),
):
    return upload_catalog_service(file)