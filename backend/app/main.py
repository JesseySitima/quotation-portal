from fastapi import FastAPI


app = FastAPI(
    title="Quotation Portal API",
    description="API for the Medical Quotation Portal",
    version="1.0.0",
)

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "ok",
        "service": "quotation-portal-api",
    }