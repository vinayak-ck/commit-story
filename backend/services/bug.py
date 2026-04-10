from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def predict_bugs(commits):
    if not commits:
        return "No data available"

    # 🔹 Prepare commit history (limit for token safety)
    commit_text = "\n".join([
    f"{c['message'][:80]}"
    for c in commits[:15]
])

    prompt = f"""
You are a senior software quality engineer.

Analyze git commit history and predict bug risk.

Keep response:
- Very short
- Max 4 sections
- Each section 1–2 lines only
- No symbols, no extra text

Format:

BUG RISK: HIGH / MODERATE / LOW

WHY:
Short explanation

PATTERNS:
Key observed behavior

FIX:
What should be done

Commit History:
{commit_text}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("Bug Prediction AI Error:", e)
        return "Bug prediction failed"