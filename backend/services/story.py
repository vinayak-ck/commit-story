from groq import Groq
from config import GROQ_API_KEY

def generate_story(commits):
    if not GROQ_API_KEY:
        return "⚠️ Groq API key missing"

    if not commits:
        return "No commit history available"

    try:
        client = Groq(api_key=GROQ_API_KEY)

        commit_text = "\n".join([
            f"{c['date'][:10]} - {c['message']}"
            for c in commits[:20]
        ])

        prompt = f"""
                    You are a software engineering analyst.

                    Analyze the given git commit history and generate a simple, beginner-friendly project summary.

                    Instructions:
                    Keep the response concise (max 6–7 lines total).
                    Do not use symbols like *, -, or markdown.
                    Use clean and readable sentences.

                    Output format:
                    Total commits: 

                    Total Contributiors:

                    PROJECT:
                    What the project does in simple terms

                    EVOLUTION:
                    How the project developed over time

                    COMMITS:
                    Total commits and general activity

                    CHANGES:
                    Main types of changes (features, fixes, improvements)

                    KEY IMPROVEMENTS:
                    Most important progress made

                    Productivity leve:
                    give me in percentage

                    Commit History:
                    {commit_text}
                """

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # ✅ FIXED
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("Groq Error:", e)
        return f"⚠️ AI Error: {str(e)}"