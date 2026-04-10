import requests
from config import GITHUB_TOKEN

headers = {
    "Authorization": f"token {GITHUB_TOKEN}"
} if GITHUB_TOKEN else {}

def get_commits(owner, repo):
    try:
        url = f"https://api.github.com/repos/{owner}/{repo}/commits"

        res = requests.get(url, headers=headers)

        print("STATUS:", res.status_code)  # DEBUG

        if res.status_code != 200:
            print("GitHub error:", res.text)
            return []

        data = res.json()

        commits = []
        for c in data[:30]:
            commits.append({
                "message": c["commit"]["message"],
                "author": c["commit"]["author"]["name"],
                "date": c["commit"]["author"]["date"],
                "url": c["html_url"]
            })

        print("COMMITS COUNT:", len(commits))  # DEBUG

        return commits

    except Exception as e:
        print("GitHub Fetch Error:", e)
        return []

def get_branches(owner, repo):
    import requests

    url = f"https://api.github.com/repos/{owner}/{repo}/branches"
    res = requests.get(url, headers=headers)

    if res.status_code != 200:
        return []

    data = res.json()

    branches = [b["name"] for b in data]

    # 🔥 clean important ones
    clean = []
    for b in branches:
        if any(k in b.lower() for k in ["main", "master", "dev"]):
            clean.append(b)

    return clean[:5] if clean else branches[:5]