import fitz     # PyMuPDF
import pdfplumber
import os

def extract_text(file_path: str) -> dict:
    """
    Primary extractor: PyMuPDF
    Fallback: pdfplumber
    """
    text = ""
    page_count = 0

    try:
        # Primary - PyMuPDF
        doc = fitz.open(file_path)
        page_count = len(doc)
        for page in doc:
            text += page.get_text()
        doc.close()
    except Exception as e:
        print(f"PyMuPDF failed: {e}")

    # Fallback - pdfplumber if text too short
    if len(text.strip()) < 100:
        try:
            with pdfplumber.open(file_path) as pdf:
                page_count = len(pdf.pages)
                for page in pdf.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text += extracted
        except Exception as e:
            print(f"pdfplumber failed: {e}")
    return {
        "raw_text": text,
        "page_count": page_count,
        "char_count": len(text)
    }