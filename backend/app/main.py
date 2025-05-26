from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Relaxee API", description="API for Relaxee relaxation app", version="0.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Relaxee API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/meditation-sessions")
async def get_meditation_sessions():
    # Mock data - would be replaced with database queries
    return [
        {"id": 1, "title": "Morning Calm", "duration": 10, "category": "Mindfulness"},
        {"id": 2, "title": "Stress Relief", "duration": 15, "category": "Anxiety"},
        {"id": 3, "title": "Deep Sleep", "duration": 20, "category": "Sleep"},
        {"id": 4, "title": "Focus Enhancement", "duration": 5, "category": "Productivity"},
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)