import { useState } from "react";
import DevChart from "./DevChart";

const NAV = [
  ["story",    "Project Story"],
  ["risk",     "Risk Analysis"],
  ["insights", "Insights"],
  ["activity", "Commit Activity"],
  ["bug",      "Bug Prediction"],
  ["security", "Security Alerts"],
];

const clean = (text) =>
  text?.split("\n")
    .map(l => l.replace(/[*#•\-]/g, "").trim())
    .filter(Boolean) || [];

export default function Dashboard({ data, owner, repo, onReset }) {
  const [active,   setActive]   = useState("story");
  const [panelKey, setPanelKey] = useState(0);

  const navigate = (key) => {
    if (key === active) return;
    setActive(key);
    setPanelKey(k => k + 1);
  };

  return (
    <div className="ci-workspace">

      <header className="ci-topbar">
        <div className="ci-repopath">
          <span className="ci-owner">{owner}</span>
          <span className="ci-sep">/</span>
          <span className="ci-reponame">{repo}</span>
        </div>
        <div className="ci-topbar-right">
          <span className="ci-topbadge">GitHub</span>
          <button className="ci-back-btn" onClick={onReset}>New Analysis</button>
        </div>
      </header>

      <div className="ci-layout">

        <nav className="ci-sidebar">
          {NAV.map(([key, label]) => (
            <button
              key={key}
              className={`ci-navitem${active === key ? " ci-navactive" : ""}`}
              onClick={() => navigate(key)}
            >
              <span className="ci-dot" />
              {label}
            </button>
          ))}
        </nav>

        <main className="ci-panel" key={panelKey}>

          {active === "story" && (
            <section className="ci-section">
              <h2 className="ci-sectitle">Project Story</h2>
              {clean(data.story).map((t, i) => (
                <p key={i} className="ci-body">{t}</p>
              ))}
            </section>
          )}

          {active === "risk" && (
            <section className="ci-section">
              <h2 className="ci-sectitle">Risk Analysis</h2>
              {clean(data.risk).map((t, i) => (
                <div key={i} className="ci-listitem">{t}</div>
              ))}
            </section>
          )}

          {/* ── MERGED INSIGHTS ── */}
          {active === "insights" && (
            <section className="ci-section">
              <h2 className="ci-sectitle">Insights</h2>
              <div className="ci-insights-grid">

                {/* LEFT — Contributors */}
                <div className="ci-insights-col">
                  <div className="ci-col-label">Top Contributors</div>
                  {data.developers?.contributors?.map((d, i) => (
                    <div
                      key={i}
                      className="ci-contrib"
                      style={{ animationDelay: `${i * 0.07}s` }}
                    >
                      <div className="ci-contrib-row">
                        <span className="ci-contrib-name">{d.name}</span>
                        <span className="ci-contrib-pct">{d.percent || 0}%</span>
                      </div>
                      <div className="ci-track">
                        <div
                          className="ci-fill"
                          style={{
                            width: `${d.percent || 0}%`,
                            animationDelay: `${i * 0.07 + 0.12}s`,
                          }}
                        />
                      </div>
                      <div className="ci-contrib-meta">
                        {d.count?.toLocaleString()} commits
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vertical divider */}
                <div className="ci-insights-divider" />

                {/* RIGHT — Active Branches */}
                <div className="ci-insights-col">
                  <div className="ci-col-label">Active Branches</div>
                  <div className="ci-chips">
                    {data.branches?.map((b, i) => (
                      <div
                        key={i}
                        className="ci-chip"
                        style={{ animationDelay: `${i * 0.06}s` }}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          )}

          {active === "activity" && (
            <section className="ci-section ci-chart-section">
              <h2 className="ci-sectitle">Commit Activity</h2>
              <div className="ci-chart-wrap">
                <DevChart data={data.developers?.timeline} />
              </div>
            </section>
          )}

          {active === "bug" && (
            <section className="ci-section">
              <h2 className="ci-sectitle">Bug Prediction</h2>
              {clean(data.bug_prediction).map((t, i) => (
                <div key={i} className="ci-alert ci-alert-high">{t}</div>
              ))}
            </section>
          )}

          {active === "security" && (
            <section className="ci-section">
              <h2 className="ci-sectitle">Security Alerts</h2>
              {clean(data.security).map((t, i) => (
                <div key={i} className="ci-alert ci-alert-med">{t}</div>
              ))}
            </section>
          )}

        </main>
      </div>
    </div>
  );
}