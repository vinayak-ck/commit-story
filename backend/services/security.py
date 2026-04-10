from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def analyze_security(commits):
    if not commits:
        return "No data available"

    commit_text = "\n".join([
    f"{c['message'][:80]}"
    for c in commits[:15]
])

    prompt = f"""
You are a cybersecurity expert.

Analyze the given git commit history and identify potential security risks.

Instructions:
Keep the response very concise (max 5–6 lines total).
Do not use symbols like *, -, or markdown.
Each section must be short and clear.

Output format:

SECURITY STATUS: SAFE / WARNING / CRITICAL

ISSUE:
Briefly describe the main risk detected

IMPACT:
Explain possible damage in simple terms

FIX:
Give 1–2 practical steps to resolve it

Commit History:
{commit_text}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # ✅ FIXED
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("Security AI Error:", e)
        return "Security analysis failed"