from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, analyze, download

app = FastAPI(
    title="LegalEase API",
    description="AI-powered contract analysis backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(upload.router, prefix="/api")
app.include_router(analyze.router, prefix="/api")
app.include_router(download.router, prefix="/api")

@app.get("/")
def root():
    return {"status": "LegalEase API is running ✅"}