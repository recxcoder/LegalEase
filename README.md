<table align="center">
  <tr>
    <td>
      <img src="frontend/public/logo.png" width="85" alt="LegalEase Logo">
    </td>
    <td>
      <h1>LegalEase</h1>
      <p>AI-Powered Contract Analyzer</p>
    </td>
  </tr>
</table>

> **Read what you're actually signing.**

LegalEase is an AI-powered contract analysis web app that detects risky clauses in any PDF contract, explains them in plain English, and tells you who the contract really favors — in seconds.

<p align="center">
  <a href="https://getlegalease.vercel.app">🌐 Live App</a> •
  <a href="https://github.com/recxcoder/LegalEase">💻 GitHub Repo</a> •
  <a href="https://legalease-backend-4lof.onrender.com/docs">⚡ API Docs</a>
</p>

---

## 🚩 The Problem

Most people sign contracts without truly understanding them — internship offers, rental agreements, freelance contracts, NDAs. Legal language is deliberately complex, and hiring a lawyer for every document is not realistic for students, freelancers, or early-stage founders.

> **9 out of 10 people admit to signing contracts without reading them fully.**

---

## ✅ The Solution

LegalEase is an AI-powered contract analysis web app. Upload any PDF contract and get an instant breakdown — red flag detection, plain English explanations, and a power balance score that shows exactly who the contract really favors.

### Features

| Feature | Description |
|---|---|
| 🔴 **Red Flag Detection** | Spots non-compete, IP assignment, auto-renewal, indemnity, and forced arbitration clauses |
| 💬 **Plain English Explainer** | Every risky clause explained simply — no legal degree needed |
| ⚖️ **Power Balance Score** | A 0–100 score showing how much the contract favors the other party |
| 📄 **PDF Report Export** | Download a full flagged analysis report as a PDF |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | FastAPI, Python |
| **AI / LLM** | Google Gemini API (gemini-3.6-flash) |
| **PDF Processing** | PyMuPDF, pdfplumber, Pytesseract |
| **Report Generation** | ReportLab |
| **Frontend Deploy** | Vercel |
| **Backend Deploy** | Render |

---

## ⚡ How It Works

```
1. Upload PDF Contract
        ↓
2. PyMuPDF extracts text from PDF
        ↓
3. Text cleaned and sent to Gemini AI
        ↓
4. AI identifies risky clauses and explains them
        ↓
5. Power Balance Score calculated (0–100)
        ↓
6. Results rendered on dashboard
        ↓
7. Download full PDF report
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   React Frontend                     │
│         (Vercel — getlegalease.vercel.app)           │
│                                                      │
│  UploadScreen → LoadingState → ResultsDashboard      │
│         Single-file state machine (JSX)              │
└───────────────────┬─────────────────────────────────┘
                    │ HTTP (fetch API)
                    ↓
┌─────────────────────────────────────────────────────┐
│                  FastAPI Backend                     │
│       (Render — legalease-backend.onrender.com)      │
│                                                      │
│  POST /api/upload   → saves PDF                      │
│  POST /api/analyze  → runs full pipeline             │
│  GET  /api/download → returns PDF report             │
└───────────┬─────────────────┬───────────────────────┘
            │                 │
            ↓                 ↓
┌───────────────────┐  ┌─────────────────────────────┐
│   PDF Processor   │  │      Gemini AI (Google)      │
│  PyMuPDF          │  │  gemini-3.6-flash model      │
│  pdfplumber       │  │  Clause extraction +         │
│  text_cleaner     │  │  Risk classification +       │
│  OCR fallback     │  │  Plain English explanation   │
└───────────────────┘  └─────────────────────────────┘
```

---

## 📁 Project Structure

```
LegalEase/
├── backend/
│   ├── core/
│   │   ├── ai_pipeline.py        # Gemini AI integration
│   │   ├── pdf_processor.py      # PyMuPDF text extraction
│   │   ├── text_cleaner.py       # Text preprocessing
│   │   ├── scoring.py            # Power balance score logic
│   │   └── report_generator.py   # ReportLab PDF report
│   ├── routes/
│   │   ├── upload.py             # POST /api/upload
│   │   ├── analyze.py            # POST /api/analyze
│   │   └── download.py           # GET /api/download/{id}
│   ├── models/
│   │   ├── request_models.py
│   │   └── response_models.py
│   ├── main.py                   # FastAPI app entry point
│   ├── config.py                 # Environment config
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── pages/
│   │   │   └── LegalEase.jsx     # Single-file React app
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── render.yaml
└── README.md
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

- Python 3.10+
- Node.js 18+
- Google Gemini API Key — free at [aistudio.google.com](https://aistudio.google.com)

### 1 — Clone the Repo

```bash
git clone https://github.com/recxcoder/LegalEase.git
cd LegalEase
```

### 2 — Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# Install dependencies
pip install -r requirements.txt
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

Start the backend:

```bash
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### 3 — Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend running at → `http://localhost:5173`

### 4 — Test It

```
http://localhost:5173
```

Upload any PDF contract and get instant AI analysis!

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |

### Deploy Backend to Render

```bash
# render.yaml is already configured
git push origin main
# Render auto-deploys on every push
```

### Deploy Frontend to Vercel

```bash
cd frontend
vercel --prod
```

---

## 🎯 Use Cases

| User | Use Case |
|---|---|
| 🎓 **Students** | Reviewing internship and job offer letters before signing |
| 🏠 **Tenants** | Checking rental and lease agreements for hidden clauses |
| 💼 **Freelancers** | Analyzing client service contracts for IP and payment terms |
| 🚀 **Founders** | Reviewing investor term sheets and vendor agreements |

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key from aistudio.google.com | ✅ Yes |
| `TAVILY_API_KEY` | Tavily web search API key from tavily.com | Optional |

Create a `backend/.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

---

## ⚠️ Disclaimer

LegalEase is an AI-powered tool for **informational purposes only**. The analysis provided does not constitute legal advice and should not be treated as such. AI models can make mistakes — always read the original contract yourself and consult a qualified lawyer before making important legal decisions.

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

```
MIT License

Copyright (c) 2026 Shivam (recxcoder)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👨‍💻 Built By

**Shivam** — 2nd year B.Tech CSE student, aspiring Agentic AI engineer

- GitHub: [@recxcoder](https://github.com/recxcoder)
- Built as a mini project to help people understand what they are signing

---

<div align="center">
  <br />
  <strong>LegalEase — No lawyer. No confusion. Just clarity.</strong>
  <br /><br />
  <a href="https://getlegalease.vercel.app">🌐 Try it live</a> •
  <a href="https://github.com/recxcoder/LegalEase">⭐ Star on GitHub</a>
</div>
