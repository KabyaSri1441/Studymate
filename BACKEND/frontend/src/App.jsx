import { useState } from "react";
import "./App.css";

export default function App() {
  const [mode, setMode] = useState(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary("");
    const res = await fetch("http://localhost:8000/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setLoading(false);
  };

  return (
    <div className="app">

      {/* First Screen — centered in the middle of the page */}
      {mode === null && (
        <div className="menu-screen">
          <h1 className="title">📚 StudyMate</h1>
          <p className="subtitle">What would you like to do?</p>
          <button className="button" onClick={() => setMode("summary")}>
            Generate Summary
          </button>
        </div>
      )}

      {/* Summarizer Screen — wide two-column layout */}
      {mode === "summary" && (
        <div className="summarizer-screen">
          <h1 className="title">📚 StudyMate</h1>

          <div className="two-col">

            {/* Left: Input */}
            <div className="col">
              <h3 className="col-label">Your Text</h3>
              <textarea
                className="textarea"
                placeholder="Paste your notes or paragraph here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Right: Output */}
            <div className="col">
              <h3 className="col-label">Summary</h3>
              <div className="summary-box">
                {loading && <p className="placeholder-text">Generating summary...</p>}
                {!loading && !summary && <p className="placeholder-text">Your summary will appear here...</p>}
                {!loading && summary && <p>{summary}</p>}
              </div>
            </div>

          </div>

          {/* Centered buttons below both columns */}
          <div className="button-row">
            <button className="button" onClick={handleSummarize}>
              {loading ? "Summarizing..." : "Generate Summary"}
            </button>
            <button className="back-button" onClick={() => { setMode(null); setText(""); setSummary(""); }}>
              ← Back
            </button>
          </div>

        </div>
      )}

    </div>
  );
}