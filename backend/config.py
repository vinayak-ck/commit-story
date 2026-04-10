import os
from dotenv import load_dotenv

# 🔥 FORCE LOAD FROM CURRENT FILE DIRECTORY
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# DEBUG
print("DEBUG OPENAI KEY:", GROQ_API_KEY)