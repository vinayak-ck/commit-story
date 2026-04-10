from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.github import get_commits
from services.story import generate_story
from services.github import get_commits
from services.story import generate_story
from services.risk import analyze_risk
from services.dev import developer_stats
from services.github import get_branches
from services.bug import predict_bugs
from services.security import analyze_security

import os
allow_origins=[os.getenv("FRONTEND_URL", "*")]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"msg": "Server running ✅"}

@app.get("/analyze")
def analyze(owner: str, repo: str):
    try:
        commits = get_commits(owner, repo)

        story = generate_story(commits)
        risk = analyze_risk(commits)
        devs = developer_stats(commits)
        branches = get_branches(owner, repo)
        bug_prediction = predict_bugs(commits)
        security = analyze_security(commits)

        return {
            "story": story,
            "risk": risk,
            "developers": devs,
            "branches": branches,
            "bug_prediction": bug_prediction,
            "security": security
        }

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}