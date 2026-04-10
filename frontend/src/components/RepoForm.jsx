import { useState, useRef, useEffect } from "react";

// Parses a raw GitHub URL or "owner/repo" string.
// Returns { owner, repo } or null if unrecognised.
function parseGitHubInput(raw) {
  const s = raw.trim().replace(/\.git$/, "");

  // Full URL: https://github.com/owner/repo[/anything]
  const urlMatch = s.match(
    /(?:https?:\/\/)?(?:www\.)?github\.com\/([^/\s]+)\/([^/\s?#]+)/i
  );
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2] };

  // Shorthand: owner/repo
  const slashMatch = s.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (slashMatch) return { owner: slashMatch[1], repo: slashMatch[2] };

  return null;
}

export default function RepoForm({ onAnalyze }) {
  const [url,     setUrl]     = useState("");
  const [owner,   setOwner]   = useState("");
  const [repo,    setRepo]    = useState("");
  const [parsed,  setParsed]  = useState(false); // true once URL was auto-parsed
  const [error,   setError]   = useState("");
  const inputRef = useRef();

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Called on every keystroke in the smart input
  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    setError("");

    const result = parseGitHubInput(val);
    if (result) {
      setOwner(result.owner);
      setRepo(result.repo);
      setParsed(true);
    } else {
      setOwner("");
      setRepo("");
      setParsed(false);
    }
  };

  // Owner / Repo manual fields
  const handleOwnerChange = (e) => { setOwner(e.target.value); setUrl(""); setParsed(false); };
  const handleRepoChange  = (e) => { setRepo(e.target.value);  setUrl(""); setParsed(false); };

  const handleSubmit = () => {
    const o = owner.trim();
    const r = repo.trim();
    if (!o || !r) {
      setError("Enter a GitHub URL or owner / repo.");
      return;
    }
    onAnalyze(o, r);
  };

  const handleKey = (e) => { if (e.key === "Enter") handleSubmit(); };

  return (
    <div className="ci-landing">
      <div className="ci-grid" />

      {/* Ghost dashboard panels in background */}
      <div className="ci-ghost-wrap">
        <div className="ci-ghost" style={{ top: "10%",  left: "5%",   width: 260, height: 180 }} />
        <div className="ci-ghost" style={{ top: "58%",  left: "3%",   width: 200, height: 120, animationDelay: "0.2s" }} />
        <div className="ci-ghost" style={{ top: "12%",  right: "5%",  width: 300, height: 210, animationDelay: "0.1s" }} />
        <div className="ci-ghost" style={{ top: "62%",  right: "5%",  width: 240, height: 130, animationDelay: "0.3s" }} />
      </div>

      <div className="ci-card">
        <div className="ci-eyebrow">REPOSITORY INTELLIGENCE</div>
        <h1 className="ci-hero">Commit Intelligence</h1>
        <p className="ci-tagline">
          Paste a GitHub link or type an owner and repo name.<br />
          Get deep analysis — contributors, risk, security, and more.
        </p>

        {/* ── Smart URL input ── */}
        <div className="ci-url-row">
          <div className={`ci-url-wrap${parsed ? " ci-url-parsed" : ""}`}>
            <span className="ci-url-icon">
              {parsed ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 5" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 2.4a1.6 1.6 0 110 3.2 1.6 1.6 0 010-3.2zm0 8.4a4.8 4.8 0 01-4-2.147C4.02 9.54 6.68 8.8 8 8.8c1.32 0 3.98.74 4 1.853A4.8 4.8 0 018 12.8z" fill="#475569"/>
                </svg>
              )}
            </span>
            <input
              ref={inputRef}
              className="ci-inp ci-inp-url"
              placeholder="https://github.com/owner/repo  or  owner / repo"
              value={url}
              onChange={handleUrlChange}
              onKeyDown={handleKey}
            />
            {parsed && (
              <span className="ci-url-badge">
                {owner} / {repo}
              </span>
            )}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="ci-divider">
          <span>or enter manually</span>
        </div>

        {/* ── Manual owner / repo ── */}
        <div className="ci-manual-row">
          <input
            className="ci-inp"
            placeholder="owner"
            value={owner}
            onChange={handleOwnerChange}
            onKeyDown={handleKey}
          />
          <span className="ci-slash">/</span>
          <input
            className="ci-inp"
            placeholder="repository"
            value={repo}
            onChange={handleRepoChange}
            onKeyDown={handleKey}
          />
        </div>

        {error && <div className="ci-error">{error}</div>}

        <button className="ci-btn" onClick={handleSubmit}>
          Analyze Repository
        </button>

        <div className="ci-hint">
          e.g.&nbsp; https://github.com/facebook/react &nbsp;·&nbsp; vercel / next.js
        </div>
      </div>
    </div>
  );
}