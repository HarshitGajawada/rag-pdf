# RAG-PDF Q&A System

A role-based Q&A system that uses RAG (Retrieval Augmented Generation) to answer questions based on PDF documents.

## Features

- Role-based authentication (Admin & Client)
- PDF document upload and processing (Admin)
- Q&A interface for clients
- RAG-based question answering
- JWT authentication
- Modern UI with Tailwind CSS

## Tech Stack

- Frontend: React with JavaScript
- Backend: Node.js with Express
- RAG Server: Python with FastAPI
- Database: MongoDB
- Vector Database: ChromaDB
- Authentication: JWT
- PDF Processing: pdf-parse, PyMuPDF
- LLM: Google Gemini
- Styling: Tailwind CSS

## Project Structure

```
rag-pdf/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Auth context
│   │   └── api/          # API services
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helper functions
└── server-python/         # Python RAG server
    ├── app/
    │   ├── main.py       # FastAPI application
    │   ├── rag.py        # RAG logic with ChromaDB
    │   └── utils.py      # PDF processing utilities
    ├── chroma_db/        # ChromaDB vector storage
    └── requirements.txt  # Python dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB
- Google Gemini API key

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   RAG_SERVICE_URL=http://localhost:8000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Python RAG Server Setup

1. Navigate to the server-python directory:
   ```bash
   cd server-python
   ```

2. Create a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a .env file with the following variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. Start the Python server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_RAG_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Admin Routes
- POST /api/documents/upload - Upload PDF document
- GET /api/documents - Get all documents
- DELETE /api/documents/:id - Delete document

### Client Routes
- POST /api/qa/ask - Ask a question
- GET /api/qa/history - Get question history

## License

MIT 