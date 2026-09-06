from groq import Groq
from config import GROQ_API_KEY
import json

client = Groq(api_key=GROQ_API_KEY)

PROPMT = """You are a contract risk analyst. Analyze this contract text and return a JSON object (no markdown, no backticks, pure JSON) with this exact shape:

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

def analyze_contract(clean_text: str) -> str:
    # Limited text to avoid token limits
    text_chunk = clean_text[:12000]

    try:
        reponse = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": PROMPT + text_chunk
                }
            ],
            max_tokens=2000,
            temperature=0.1
        )

        raw = response.choices[0].message.content
        # Clean any accidental markdown
        clean = raw.replace("```json", "").replace("```", "").strip()
        result = json.loads(clean)
        return result

    except josn.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        print(f"Raw response: {raw}")
        raise Exception("AI returned invalid JSON. Please try again.")
    except Exception as e:
        print(f"API error: {e}")
        raise Exception(f"AI analysis failed: {str(e)}")