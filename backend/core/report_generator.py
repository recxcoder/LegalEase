from reportlab.lib.pages.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
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

    doc = SimpleDocTemplate(
        path,
        pagesize=A4,
        rightMargin=0.75 * inch,
        leftMargin=0.75 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch
    )

    # ── Styles ──────────────────────────────────────────
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "Title",
        fontSize=22,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#0A0F2C"),
        alignment=TA_CENTER,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        "Subtitle",
        fontSize=11,
        fontName="Helvetica",
        textColor=colors.HexColor("#666666"),
        alignment=TA_CENTER,
        spaceAfter=4
    )

    section_style = ParagraphStyle(
        "Section",
        fontSize=13,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#0A0F2C"),
        spaceBefore=14,
        spaceAfter=6
    )

    clause_name_style = ParagraphStyle(
        "ClauseName",
        fontSize=11,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#1a1a1a"),
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        "Body",
        fontSize=10,
        fontName="Helvetica",
        textColor=colors.HexColor("#333333"),
        spaceAfter=3,
        leading=14
    )

    quote_style = ParagraphStyle(
        "Quote",
        fontSize=9,
        fontName="Helvetica-Oblique",
        textColor=colors.HexColor("#555555"),
        leftIndent=12,
        spaceAfter=3,
        leading=13
    )

    disclaimer_style = ParagraphStyle(
        "Disclaimer",
        fontSize=8,
        fontName="Helvetica",
        textColor=colors.HexColor("#888888"),
        alignment=TA_CENTER,
        spaceAfter=2
    )

    # ── Severity colors ──────────────────────────────────
    severity_colors = {
        "Red flag": colors.HexColor("#FF3B3B"),
        "Warning":  colors.HexColor("#FFB800"),
        "Safe":     colors.HexColor("#00C853"),
    }

    severity_bg = {
        "Red flag": colors.HexColor("#FFF0F0"),
        "Warning":  colors.HexColor("#FFFBF0"),
        "Safe":     colors.HexColor("#F0FFF4"),
    }

    # ── Count clauses ────────────────────────────────────
    red_flags = [c for c in clauses if c.get("severity") == "Red flag"]
    warnings   = [c for c in clauses if c.get("severity") == "Warning"]
    safe       = [c for c in clauses if c.get("severity") == "Safe"]

    # ── Build content ────────────────────────────────────
    content = []

    # Header
    content.append(Spacer(1, 0.2 * inch))
    content.append(Paragraph("⚖ LegalEase", title_style))
    content.append(Paragraph("AI Contract Analysis Report", subtitle_style))
    content.append(Paragraph(f"File: {file_name}", subtitle_style))
    content.append(HRFlowable(width="100%", thickness=1.5,
                               color=colors.HexColor("#0A0F2C"), spaceAfter=12))

    # Summary table
    score_color = (
        colors.HexColor("#FF3B3B") if power_score >= 70
        else colors.HexColor("#FFB800") if power_score >= 40
        else colors.HexColor("#00C853")
    )

    summary_data = [
        ["Power Balance Score", "Red Flags", "Warnings", "Safe Clauses"],
        [
            Paragraph(f'<font color="#{score_color.hexval()[2:]}"><b>{power_score}/100</b></font>', body_style),
            Paragraph(f'<font color="#FF3B3B"><b>{len(red_flags)}</b></font>', body_style),
            Paragraph(f'<font color="#FFB800"><b>{len(warnings)}</b></font>', body_style),
            Paragraph(f'<font color="#00C853"><b>{len(safe)}</b></font>', body_style),
        ]
    ]

    summary_table = Table(summary_data, colWidths=[2 * inch] * 4)
    summary_table.setStyle(TableStyle([
        ("BACKGROUND",  (0, 0), (-1, 0), colors.HexColor("#0A0F2C")),
        ("TEXTCOLOR",   (0, 0), (-1, 0), colors.white),
        ("FONTNAME",    (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE",    (0, 0), (-1, 0), 10),
        ("ALIGN",       (0, 0), (-1, -1), "CENTER"),
        ("VALIGN",      (0, 0), (-1, -1), "MIDDLE"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#F8F8F8")]),
        ("GRID",        (0, 0), (-1, -1), 0.5, colors.HexColor("#DDDDDD")),
        ("TOPPADDING",  (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("ROUNDEDCORNERS", [4]),
    ]))

    content.append(summary_table)
    content.append(Spacer(1, 0.2 * inch))

    # Score interpretation
    if power_score >= 70:
        interp = "🔴 This contract heavily favors the other party. Review carefully before signing."
    elif power_score >= 40:
        interp = "⚠️ This contract has some concerns. Consider negotiating key clauses."
    else:
        interp = "✅ This contract appears relatively balanced and fair."

    content.append(Paragraph(interp, body_style))
    content.append(Spacer(1, 0.15 * inch))

    # Clauses section
    content.append(HRFlowable(width="100%", thickness=0.5,
                               color=colors.HexColor("#CCCCCC"), spaceAfter=6))
    content.append(Paragraph("Clause Analysis", section_style))

    for i, clause in enumerate(clauses, 1):
        severity = clause.get("severity", "Warning")
        name     = clause.get("name", "Unknown Clause")
        ref      = clause.get("reference", "N/A")
        quote    = clause.get("quote", "")
        plain    = clause.get("plain", "")

        sev_color = severity_colors.get(severity, colors.gray)
        sev_bg    = severity_bg.get(severity, colors.white)

        # Clause card as table
        badge = f'<font color="white"><b> {severity.upper()} </b></font>'
        card_data = [[
            Paragraph(f"{i}. {name}", clause_name_style),
            Paragraph(badge, ParagraphStyle(
                "Badge",
                fontSize=8,
                fontName="Helvetica-Bold",
                textColor=colors.white,
                backColor=sev_color,
                alignment=TA_CENTER
            ))
        ]]

        card_table = Table(card_data, colWidths=[4.5 * inch, 1.5 * inch])
        card_table.setStyle(TableStyle([
            ("BACKGROUND",    (0, 0), (-1, -1), sev_bg),
            ("ALIGN",         (1, 0), (1, 0), "RIGHT"),
            ("VALIGN",        (0, 0), (-1, -1), "MIDDLE"),
            ("TOPPADDING",    (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ("LEFTPADDING",   (0, 0), (0, 0), 8),
            ("RIGHTPADDING",  (1, 0), (1, 0), 8),
            ("ROUNDEDCORNERS", [4]),
        ]))

        content.append(card_table)

        if ref and ref != "N/A":
            content.append(Paragraph(f"<b>Reference:</b> {ref}", body_style))
        if quote:
            content.append(Paragraph(f'"{quote}"', quote_style))
        if plain:
            content.append(Paragraph(f"<b>Plain English:</b> {plain}", body_style))

        content.append(Spacer(1, 0.1 * inch))

    # Disclaimer
    content.append(HRFlowable(width="100%", thickness=0.5,
                               color=colors.HexColor("#CCCCCC"), spaceAfter=8))
    content.append(Paragraph(
        "DISCLAIMER: LegalEase is for informational purposes only. "
        "Always consult a qualified lawyer for legal decisions.",
        disclaimer_style
    ))
    content.append(Paragraph("Generated by LegalEase — AI Contract Analyzer", disclaimer_style))

    # Build PDF
    doc.build(content)
    return report_id