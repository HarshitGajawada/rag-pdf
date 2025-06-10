from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from app.rag import process_pdf, answer_question

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    return await process_pdf(file)

@app.post("/ask")
async def ask(question: str = Form(...)):
    return await answer_question(question)