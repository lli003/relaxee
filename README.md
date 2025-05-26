# Relaxee

A relaxation and meditation app to help users reduce stress and improve mental wellbeing.

## Project Structure

This project is divided into two main parts:

- **Frontend**: React application built with Vite and Chakra UI
- **Backend**: FastAPI application

## Features

- Guided meditation sessions
- Relaxing soundscapes
- Sleep stories
- Breathing exercises
- User profiles and progress tracking

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m app.main
```

The backend API will be available at http://localhost:8000

## API Documentation

Once the backend is running, you can access the API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## License

MIT