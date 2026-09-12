import google.generativeai as genai
import json
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

PROMPT = """You are a contract risk analyst. Analyze this contract text and return a JSON object (no markdown, no backticks, pure JSON) with this exact shape:

{
  "score": <integer 0-100 where 100 = heavily favors the company/other party, 0 = heavily favors you>,
  "clauses": [
    {
      "severity": "Red flag" | "Warning" | "Safe",
      "name": "<short clause name>",
      "reference": "<Clause X.X or Section X>",
      "quote": "<verbatim excerpt from the contract, max 2 sentences>",
      "plain": "<plain English explanation under 20 words>"
    }
  ]
}

Rules:
- Include ALL significant clauses (aim for 8-16 total)
- Red flags: strongly one-sided, potentially illegal, waive important rights
- Warnings: unusual or restrictive but not extreme
- Safe clauses: standard, fair, protective of signer
- Return ONLY the JSON object, nothing else

Contract text:
"""

def analyze_contract(clean_text: str) -> dict:
    try:
        model = genai.GenerativeModel("gemini-3.6-flash")
        response = model.generate_content(PROMPT + clean_text[:12000])

        raw = response.text

        # Clean any accidental markdown
        clean = raw.replace("```json", "").replace("```", "").strip()
        result = json.loads(clean)
        return result

    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        raise Exception("AI returned invalid JSON. Please try again.")
    except Exception as e:
        print(f"Gemini API error: {e}")
        raise Exception(f"AI analysis failed: {str(e)}")