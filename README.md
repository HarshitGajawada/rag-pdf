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
- Database: MongoDB
- Vector Database: Pinecone
- Authentication: JWT
- PDF Processing: pdf-parse
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
│   │   └── services/     # API services
└── server/                # Node.js backend
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── services/     # Business logic
    │   └── utils/        # Helper functions
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Pinecone account
- OpenAI API key

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
   PINECONE_API_KEY=your_pinecone_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the server:
   ```bash
   npm run dev
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