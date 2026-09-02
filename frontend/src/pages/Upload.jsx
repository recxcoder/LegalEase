import { useState, useRef, useCallback } from "react";

// ── Palette & tokens ────────────────────────────────────────────────────────
const COLORS = {
  bg: "#0f0f0f",
  surface: "#1a1a1a",
  surfaceHover: "#222222",
  border: "#2a2a2a",
  borderLight: "#333333",
  red: "#c0392b",
  redDim: "#7a1a14",
  redBg: "rgba(192,57,43,0.12)",
  amber: "#d4860a",
  amberBg: "rgba(212,134,10,0.12)",
  green: "#2e7d52",
  greenBg: "rgba(46,125,82,0.12)",
  text: "#f0f0f0",
  textMuted: "#888",
  textDim: "#555",
  accent: "#c0392b",
};

// ── Styles ──────────────────────────────────────────────────────────────────
const S = {
  app: {
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.text,
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "56px",
    borderBottom: `1px solid ${COLORS.border}`,
    background: COLORS.bg,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "700",
    fontSize: "16px",
    color: COLORS.text,
  },
  logoIcon: {
    width: "28px",
    height: "28px",
    background: COLORS.red,
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  navLinks: {
    display: "flex",
    gap: "28px",
    color: COLORS.textMuted,
    fontSize: "13px",
  },
  navLink: {
    color: COLORS.textMuted,
    cursor: "pointer",
    transition: "color 0.15s",
  },
};

// ── Logo ────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={S.logo}>
      <div style={S.logoIcon}>⚖</div>
      LegalEase
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ onReset }) {
  return (
    <nav style={S.nav}>
      <div onClick={onReset} style={{ cursor: "pointer" }}>
        <Logo />
      </div>
      <div style={S.navLinks}>
        {["How it works", "Examples", "About"].map((l) => (
          <span key={l} style={S.navLink}>{l}</span>
        ))}
      </div>
    </nav>
  );
}

// ── Upload Screen ────────────────────────────────────────────────────────────
function UploadScreen({ onFile, loading }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type === "application/pdf") onFile(file);
    },
    [onFile]
  );

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFile(file);
  };

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: "52px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: COLORS.redBg,
            border: `1px solid ${COLORS.redDim}`,
            borderRadius: "20px",
            padding: "5px 14px",
            fontSize: "12px",
            color: COLORS.red,
            marginBottom: "24px",
            fontWeight: "500",
          }}
        >
          <span>⟳</span> AI-powered contract analysis
        </div>
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            lineHeight: "1.2",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
            color: COLORS.text,
          }}
        >
          Read what you're
          <br />
          actually signing
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: "15px", maxWidth: "420px", margin: "0 auto" }}>
          Upload any contract PDF. Get a plain English breakdown of every risky
          clause — in seconds.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !loading && inputRef.current.click()}
        style={{
          border: `1.5px dashed ${dragging ? COLORS.red : COLORS.border}`,
          borderRadius: "12px",
          padding: "52px 32px",
          textAlign: "center",
          cursor: loading ? "not-allowed" : "pointer",
          background: dragging ? COLORS.redBg : COLORS.surface,
          transition: "all 0.2s",
          marginBottom: "40px",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleChange}
        />
        {loading ? (
          <div>
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>⏳</div>
            <p style={{ fontWeight: "600", color: COLORS.text }}>Analyzing your contract…</p>
            <p style={{ color: COLORS.textMuted, fontSize: "13px", marginTop: "4px" }}>
              Scanning clauses and calculating risk score
            </p>
          </div>
        ) : (
          <div>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: COLORS.border,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                margin: "0 auto 16px",
              }}
            >
              📄
            </div>
            <p style={{ fontWeight: "600", fontSize: "15px", marginBottom: "6px", color: COLORS.text }}>
              Drop your contract PDF here
            </p>
            <p style={{ color: COLORS.textMuted, fontSize: "13px", marginBottom: "20px" }}>
              Supports PDF files up to 10MB — rental, internship, freelance, NDA
            </p>
            <button
              style={{
                background: COLORS.red,
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 24px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Browse file
            </button>
          </div>
        )}
      </div>

      {/* Feature cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
        {[
          { icon: "🚩", title: "Red flag detection", desc: "Spots non-compete, IP assignment, auto-renewal clauses instantly" },
          { icon: "💬", title: "Plain English", desc: "Every clause explained simply — no legal degree needed" },
          { icon: "⚖️", title: "Power balance score", desc: "See who the contract really favors on a 0–100 scale" },
          { icon: "⬇️", title: "Export report", desc: "Download a full flagged PDF to share or keep for reference" },
        ].map(({ icon, title, desc }) => (
          <div
            key={title}
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "10px",
              padding: "16px",
            }}
          >
            <div style={{ fontSize: "18px", marginBottom: "8px" }}>{icon}</div>
            <div style={{ fontWeight: "600", fontSize: "13px", marginBottom: "6px", color: COLORS.text }}>{title}</div>
            <div style={{ color: COLORS.textMuted, fontSize: "12px", lineHeight: "1.5" }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Severity badge ───────────────────────────────────────────────────────────
function Badge({ type }) {
  const map = {
    "Red flag": { bg: COLORS.redBg, color: COLORS.red, border: COLORS.redDim, label: "Red flag" },
    Warning: { bg: COLORS.amberBg, color: COLORS.amber, border: "#7a5000", label: "Warning" },
    Safe: { bg: COLORS.greenBg, color: "#3cb371", border: "#1a5c38", label: "Safe" },
  };
  const t = map[type] || map["Warning"];
  return (
    <span
      style={{
        background: t.bg,
        color: t.color,
        border: `1px solid ${t.border}`,
        borderRadius: "5px",
        padding: "2px 9px",
        fontSize: "11px",
        fontWeight: "600",
      }}
    >
      {t.label}
    </span>
  );
}

// ── Clause card ──────────────────────────────────────────────────────────────
function ClauseCard({ clause }) {
  const borderColor =
    clause.severity === "Red flag"
      ? COLORS.redDim
      : clause.severity === "Warning"
      ? "#7a5000"
      : "#1a5c38";

  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "12px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Badge type={clause.severity} />
          <span style={{ fontWeight: "600", fontSize: "14px" }}>{clause.name}</span>
        </div>
        <span style={{ color: COLORS.textDim, fontSize: "12px" }}>{clause.reference}</span>
      </div>

      {/* Quote */}
      {clause.quote && (
        <div
          style={{
            margin: "12px 16px",
            padding: "12px 14px",
            borderLeft: `3px solid ${borderColor}`,
            background: "rgba(255,255,255,0.02)",
            borderRadius: "4px",
          }}
        >
          <p style={{ color: "#bbb", fontSize: "13px", fontStyle: "italic", margin: 0, lineHeight: "1.6" }}>
            "{clause.quote}"
          </p>
        </div>
      )}

      {/* Plain English */}
      <div style={{ padding: "0 16px 14px" }}>
        <p style={{ fontWeight: "600", fontSize: "13px", color: COLORS.text, margin: 0 }}>
          {clause.plain}
        </p>
      </div>
    </div>
  );
}

// ── Power score arc ──────────────────────────────────────────────────────────
function ScoreArc({ score }) {
  const r = 44;
  const cx = 60;
  const cy = 60;
  const circ = Math.PI * r; // half circle
  const pct = score / 100;
  const dashOffset = circ * (1 - pct);
  const color = score > 65 ? COLORS.red : score > 40 ? COLORS.amber : COLORS.green;

  return (
    <div style={{ textAlign: "center", paddingTop: "8px" }}>
      <p style={{ fontSize: "11px", color: COLORS.textMuted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        Power balance score
      </p>
      <svg width="120" height="72" viewBox="0 0 120 72">
        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={COLORS.border}
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div style={{ marginTop: "-12px" }}>
        <span style={{ fontSize: "42px", fontWeight: "800", color, lineHeight: 1 }}>{score}</span>
      </div>
      <p style={{ fontSize: "13px", color: COLORS.textMuted, marginTop: "4px" }}>
        {score > 65 ? "Favors the company" : score > 40 ? "Slightly unbalanced" : "Favors you"}
      </p>
    </div>
  );
}

// ── Filter button ────────────────────────────────────────────────────────────
function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 12px",
        borderRadius: "7px",
        border: "none",
        background: active ? COLORS.redBg : "transparent",
        color: active ? COLORS.red : COLORS.textMuted,
        fontWeight: active ? "600" : "400",
        fontSize: "13px",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
      }}
    >
      {label}
    </button>
  );
}

// ── Results Screen ───────────────────────────────────────────────────────────
function ResultsScreen({ result, fileName, onReset }) {
  const [filter, setFilter] = useState("all");

  const { score, clauses, summary } = result;

  const redFlags = clauses.filter((c) => c.severity === "Red flag");
  const warnings = clauses.filter((c) => c.severity === "Warning");
  const safe = clauses.filter((c) => c.severity === "Safe");

  const visible =
    filter === "red" ? redFlags : filter === "warning" ? warnings : clauses;

  const handleDownload = () => {
    const lines = [
      `LEGALEASE CONTRACT ANALYSIS REPORT`,
      `File: ${fileName}`,
      `Date: ${new Date().toLocaleDateString()}`,
      `Power Balance Score: ${score}/100`,
      ``,
      `SUMMARY`,
      `Red Flags: ${redFlags.length}  |  Warnings: ${warnings.length}  |  Safe Clauses: ${safe.length}`,
      ``,
      `CLAUSES`,
      ...clauses.map(
        (c) =>
          `[${c.severity.toUpperCase()}] ${c.name} (${c.reference})\n  Quote: "${c.quote}"\n  Plain English: ${c.plain}\n`
      ),
    ].join("\n");

    const blob = new Blob([lines], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "LegalEase_Report.txt";
    a.click();
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          borderRight: `1px solid ${COLORS.border}`,
          padding: "20px 16px",
          overflowY: "auto",
          background: COLORS.bg,
        }}
      >
        <ScoreArc score={score} />

        <div style={{ marginTop: "24px" }}>
          <p style={{ fontSize: "11px", color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>
            Summary
          </p>
          {[
            { label: "Red flags", count: redFlags.length, color: COLORS.red, dot: "🔴" },
            { label: "Warnings", count: warnings.length, color: COLORS.amber, dot: "🟡" },
            { label: "Safe clauses", count: safe.length, color: "#3cb371", dot: "🟢" },
          ].map(({ label, count, dot }) => (
            <div
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "7px 10px",
                borderRadius: "7px",
                background: COLORS.surface,
                marginBottom: "6px",
              }}
            >
              <span style={{ fontSize: "13px", display: "flex", gap: "7px", alignItems: "center" }}>
                <span style={{ fontSize: "10px" }}>{dot}</span>
                {label}
              </span>
              <span
                style={{
                  background: COLORS.border,
                  borderRadius: "12px",
                  padding: "1px 8px",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                {count}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <p style={{ fontSize: "11px", color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
            Filter by risk
          </p>
          <FilterBtn label="≡  All clauses" active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterBtn label="⚑  Red flags only" active={filter === "red"} onClick={() => setFilter("red")} />
          <FilterBtn label="⚠  Warnings only" active={filter === "warning"} onClick={() => setFilter("warning")} />
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: "auto", padding: "0" }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
            borderBottom: `1px solid ${COLORS.border}`,
            background: COLORS.surface,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
              <span style={{ fontSize: "13px" }}>📄</span>
              <span style={{ fontWeight: "700", fontSize: "15px" }}>Contract analysis</span>
            </div>
            <p style={{ color: COLORS.textMuted, fontSize: "12px", margin: 0 }}>
              {fileName} · {clauses.length} clauses · analyzed instantly
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onReset}
              style={{
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                color: COLORS.textMuted,
                borderRadius: "7px",
                padding: "8px 14px",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              ← New contract
            </button>
            <button
              onClick={handleDownload}
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                borderRadius: "7px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              ⬇ Download report
            </button>
          </div>
        </div>

        {/* Clauses list */}
        <div style={{ padding: "20px 24px" }}>
          {visible.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px", color: COLORS.textMuted }}>
              No clauses match this filter.
            </div>
          ) : (
            visible.map((c, i) => <ClauseCard key={i} clause={c} />)
          )}
        </div>
      </main>
    </div>
  );
}

// ── AI Analysis ──────────────────────────────────────────────────────────────
async function analyzeContract(base64Pdf, fileName) {
  const prompt = `You are a contract risk analyst. Analyze this contract PDF and return a JSON object (no markdown, no backticks, pure JSON) with this exact shape:

{
  "score": <integer 0-100 where 100 = heavily favors the company/other party, 0 = heavily favors you>,
  "clauses": [
    {
      "severity": "Red flag" | "Warning" | "Safe",
      "name": "<short clause name>",
      "reference": "<Clause X.X or Section X>",
      "quote": "<verbatim excerpt from the contract, max 2 sentences>",
      "plain": "<plain English explanation of what this means for the signer>"
    }
  ]
}

Rules:
- Include ALL significant clauses (aim for 8-16 total).
- Red flags are clauses that are strongly one-sided, potentially illegal, or commonly waive important rights.
- Warnings are unusual or restrictive but not extreme.
- Safe clauses are standard, fair, or protective of the signer.
- Keep quotes verbatim from the document.
- Keep plain English explanations under 20 words, direct and practical.
- Return ONLY the JSON object, nothing else.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              source: { type: "base64", media_type: "application/pdf", data: base64Pdf },
            },
            { type: "text", text: prompt },
          ],
        },
      ],
    }),
  });

  if (!response.ok) throw new Error(`API error ${response.status}`);
  const data = await response.json();
  const raw = data.content.map((b) => b.text || "").join("");
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [stage, setStage] = useState("upload"); // upload | loading | result
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    setFileName(file.name);
    setStage("loading");
    setError(null);

    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("Failed to read file"));
        r.readAsDataURL(file);
      });

      const data = await analyzeContract(base64, file.name);
      setResult(data);
      setStage("result");
    } catch (e) {
      console.error(e);
      setError(e.message || "Analysis failed. Please try again.");
      setStage("upload");
    }
  };

  const reset = () => {
    setStage("upload");
    setResult(null);
    setFileName("");
    setError(null);
  };

  return (
    <div style={S.app}>
      <Nav onReset={reset} />
      {error && (
        <div
          style={{
            background: COLORS.redBg,
            border: `1px solid ${COLORS.redDim}`,
            color: COLORS.red,
            padding: "10px 24px",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          ⚠ {error}
        </div>
      )}
      {stage === "result" && result ? (
        <ResultsScreen result={result} fileName={fileName} onReset={reset} />
      ) : (
        <UploadScreen onFile={handleFile} loading={stage === "loading"} />
      )}
    </div>
  );
}
