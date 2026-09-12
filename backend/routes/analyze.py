from fastapi import APIRouter, HTTPException
from core.pdf_processor import extract_text
from core.text_cleaner import clean_text
from core.ai_pipeline import analyze_contract
from core.scoring import calculate_power_score
from core.report_generator import generate_report
from config import UPLOAD_DIR
import os
import traceback

router = APIRouter()

@router.post("/analyze")
async def analyze(body: dict):
    file_id = body.get("file_id")
    file_name = body.get("file_name", "contract.pdf")

    print(f"DEBUG: Received file_id={file_id}, file_name={file_name}")

    if not file_id:
        raise HTTPException(status_code=400, detail="file_id is required")

    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")
    print(f"DEBUG: Looking for file at {file_path}")
    print(f"DEBUG: File exists = {os.path.exists(file_path)}")

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    try:
        print("DEBUG: Starting PDF extraction...")
        extracted = extract_text(file_path)
        raw_text = extracted["raw_text"]
        print(f"DEBUG: Extracted {len(raw_text)} characters")

        if len(raw_text.strip()) < 50:
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF."
            )

        print("DEBUG: Cleaning text...")
        cleaned = clean_text(raw_text)
        print(f"DEBUG: Cleaned text length = {len(cleaned)}")

        print("DEBUG: Calling Groq AI...")
        ai_result = analyze_contract(cleaned)
        print(f"DEBUG: AI result = {ai_result}")

        clauses = ai_result.get("clauses", [])
        ai_score = ai_result.get("score", None)

        power_score = ai_score if ai_score is not None else calculate_power_score(clauses)
        print(f"DEBUG: Power score = {power_score}")

        report_id = generate_report(clauses, power_score, file_name)
        print(f"DEBUG: Report generated = {report_id}")

        return {
            "score": power_score,
            "clauses": clauses,
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
        print(f"ERROR: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))