from config import REPORTS_DIR
import os
import uuid

def generate_report(
    clauses: list,
    power_score: int,
    file_name: str
) -> str:
    report_id = str(uuid.uuid4())
    path = os.path.join(REPORTS_DIR, f"{report_id}.txt")

    red_flags = [c for c in clauses if c.get("severity") == "Red flag"]
    warning = [c for c in clauses if c.get("severity") == "Warning"]
    safe = [c for c in clauses if c.get("severity") == "Safe"]

    lines = [
        "=" * 60,
        "   LEGALEASE CONTRACT ANALYSIS REPORT",
        "=" * 60,
        f"File: {file_name}",
        f"Power Balance Score: {power_score}/100",
        f"Red Flags: {len(red_flags)}",
        f"Warnings: {len(warning)}"
        f"Safe Clauses: {len(safe)}"
        "=" * 60,
        "",
        "CLAUSES",
        "-" * 60,
    ]   

    lines += [
        "=" * 60,
        "DISCLAMER: LegalEase is for informational purposes only."
        "Always consult a qualified lawyer for legal decisioins."
        "=" * 60,
    ]

    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    return report_id