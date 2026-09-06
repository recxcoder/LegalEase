from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from config import REPORTS_DIR
import os

router = APIRouter()

@router.get("/download/{report_id}")
async def download_report(report_id: str):
    file_path = os.path.join(REPORTS_DIR, f"{report_id}.txt")

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Report not found")

    return FileResponse(
        path=file_path,
        filename="LegalEase_Report.txt",
        media_type="text/plain"
    )