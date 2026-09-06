import re

def clean_text(raw_text: str) -> str:
    # Remove page numbers
    text = re.sub(r'\bPage\s+\d+\s*(of\s*\d+)?\b', '', raw_text, flags=re.IGNORECASE)
    # Remove excessive whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r'[ \t]{2,}', ' ', text)
    # Remove common header/footer patterns
    text = re.sub(r'CONFIDENTIAL|DRAFT|PROPRIETARY', '', text, flags=re.IGNORECASE)
    # Fix broken words from PDF extraction
    text = re.sub(r'(\w)-\n(\w)', r'\1\2', text)
    return text.strip()