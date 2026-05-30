# 🔍 Commit Story — AI-Powered GitHub Commit Analyser

An AI tool that reads a GitHub repository's full commit history and narrates it as a **human-readable story** — with bug prediction, risk analysis, security alerts, and developer behaviour insights.

🔗 **Live Demo**: [commit-story-eight.vercel.app](https://commit-story-eight.vercel.app/)

---

## ✨ Features

- 📖 AI-generated narrative of a project's entire evolution
- 🐛 Bug prediction based on commit patterns
- ⚠️ Risk analysis and security alert detection
- 📊 Commit activity trends and timeline
- 🧑‍💻 Developer behaviour analysis (commit frequency, patterns)
- 🔗 Works with any public GitHub repository (URL or `owner/repo` format)

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Backend | Python |
| AI Engine | Groq API (LLaMA) |
| Data Source | GitHub REST API |
| Frontend | HTML, CSS, JavaScript |
| Deployment | Vercel |

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/vinayak-ck/commit-story.git
cd commit-story

# Install dependencies
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Add your GROQ_API_KEY and GITHUB_TOKEN in .env

# Run the app
python app.py
```

---

## ⚙️ Environment Variables

```env
GROQ_API_KEY=your_groq_api_key_here
GITHUB_TOKEN=your_github_personal_access_token
```

Get a Groq API key at [console.groq.com](https://console.groq.com)  
Get a GitHub token at [github.com/settings/tokens](https://github.com/settings/tokens)

---

## 💡 How It Works

1. User inputs a GitHub repo URL or `owner/repo`
2. App fetches full commit history via GitHub API
3. Commits are sent to Groq's LLaMA model with a structured prompt
4. AI returns a story-format analysis with risk and bug insights
5. Results are displayed in a clean dashboard UI

---

## 👥 Team

Built by:

- Vinayak C Kanavalli
- Sujan H U
- V Mohankumar
- Y Vishnuvardhan Reddy

## 📬 Contact

For queries or collaboration:

Email: vckanavalli@gmail.com
GitHub: https://github.com/vinayak-ck