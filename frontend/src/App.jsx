import { useState } from "react";
import RepoForm from "./components/RepoForm";
import Dashboard from "./components/Dashboard";
import { analyzeRepo } from "./services/api";

export default function App() {
  const [owner, setOwner] = useState("");
  const [repo,  setRepo]  = useState("");
  const [data,  setData]  = useState(null);
  const [phase, setPhase] = useState("landing"); // landing | loading | dashboard

  const handleAnalyze = async (ownerVal, repoVal) => {
    setOwner(ownerVal);
    setRepo(repoVal);
    setPhase("loading");

    try {
      const res = await analyzeRepo(ownerVal, repoVal);
      setTimeout(() => {
        setData(res);
        setPhase("dashboard");
      }, 1200);
    } catch (err) {
      console.error(err);
      setPhase("landing");
    }
  };

  const handleReset = () => {
    setData(null);
    setOwner("");
    setRepo("");
    setPhase("landing");
  };

  return (
    <>
      {phase === "landing" && (
        <RepoForm onAnalyze={handleAnalyze} />
      )}

      {phase === "loading" && (
        <div className="ci-loader">
          <div className="ci-ring" />
          <div className="ci-loader-label">Analyzing {owner} / {repo}</div>
        </div>
      )}

      {phase === "dashboard" && data && (
        <Dashboard
          data={data}
          owner={owner}
          repo={repo}
          onReset={handleReset}
        />
      )}
    </>
  );
}