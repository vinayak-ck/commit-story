from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def analyze_risk(commits):
    if not commits:
        return "No data available"

    # 🔹 Prepare commit history (limit for token safety)
    commit_text = "\n".join([
    f"{c['message'][:80]}"
    for c in commits[:15]
])

    prompt = f"""
You are a software engineering analyst.

Analyze the git commit history and assess project risk.

Keep the response very short (max 4–5 lines).
No symbols, no markdown, no extra text.

Output format:

RISK: HIGH / MEDIUM / LOW

WHY:
Short reason

PATTERN:
Key development behavior

ACTION:
One practical suggestion

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
        print("Risk AI Error:", e)
        return "Risk analysis failed"