from fastapi import APIRouter, HTTPException
from core.pdf_processor import extract_text
from core.text_cleaner import clean_text
from core.ai_pipeline import analyze_contract
from core.scoring import calculate_power_score
from core.report_generator import generate_report
from config import UPLOAD_DIR
import os

router = APIRouter()

@router.post("/analyze")
async def analyze(body: dict):
    file_id = body.get("file_id")
    file_name = body.get("file_name", "contract.pdf")

    if not file_id:
        raise HTTPException(status_code=400, detail="file_id is required")
    
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")

    if not os.path.exists(file_path):
        raise HTTPException(statuse_code=404, detail="File not found")

    try:
        extract_text = extract_text(file_path)
        raw_text = extracted["raw_text"]

        if len(raw_text.strip()) < 50:
            raise HTTPException(status_code=400, details="Could not extract text from PDF. Try a non-scanned PDF")

        
        cleaned = clean_text(raw_text)

        ai_result = analyze_contract(cleaned)
        clauses = ai_result.get("clauses", [])
        ai_score = ai_result.get("score", None)

        report_id = generate_report(clauses, power_score, file_name)

        return {
            "score": power_score,
            "clauses": clause,
            "total_clauses": len(clauses),
            "red_flags": len([c for c in clauses if c.get("severity") == "Red flag"]),
            "warnings": len([c for c in clauses if c.get("severity") == "Warning"]),
            "safe_clauses": len([c for c in clauses if c.get("severity") == "Safe"]),
            "file_name": file_name,
            "report_id": report_id
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))