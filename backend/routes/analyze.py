from fastapi import APIRouter

router = APIRouter()

@router.post("/analyze")
async def analyze(body: dict):
    return {"message": "Analyze endpoint ready. AI pipeline coming soon."}