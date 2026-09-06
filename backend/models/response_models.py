from pydantic import BaseModel
from typing import List, Optional

class Clause(BaseModel):
    severity: str           # "Red flag" | "Warning" | "Safe"
    name: str
    reference: str
    quote: str
    plain: str

class AnalysisResponse(BaseModel):
    score: int              # 0-100 power balance score
    clauses: List[Clause]
    total_clauses: int
    red_flags: int
    warnings: int
    safe_clauses: int
    file_name: str
    report_id: Optional[str] = None